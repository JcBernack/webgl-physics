function C(re, im) {
    var that = {
        re: re,
        im: im
    };
    that.add = function(c) {
        that.re += c.re;
        that.im += c.im;
        return that;
    };
    that.square = function() {
        // (a+bi)*(a+bi)
        // = (a^2-b^2) + (2ab)i
        var tmp = that.re*that.re - that.im*that.im;
        that.im = 2*that.re*that.im;
        that.re = tmp;
        return that;
    };
    that.lengthSquared = function() {
        return that.re*that.re + that.im*that.im;
    };
    that.copy = function() {
        return C(that.re, that.im);
    };
    return that;
}

function message(e) {
    var d = e.data;

    d.result = [];
    for (var y = 0; y < d.height; y++) {
        var im = d.im_start + y * d.im_range / d.height;
        for (var x = 0; x < d.width; x++) {
            var c = C(d.re_start + x * d.re_range / d.width, im);
            var z = c.copy();
            // iterate Z(i+1) = Z(i)^2 + C as long as |Z| < 2 and i < max
            for (var i = 0; i < d.iterations && z.lengthSquared() < 4; i++) {
                z.square().add(c);
            }

            // var cre = d.re_start + x * d.re_range / d.width;
            // var cim = im;
            // var zre = cre;
            // var zim = cim;
            // // iterate Z(i+1) = Z(i)^2 + C as long as |Z| < 2 and i < max
            // for (var i = 0; i < d.iterations && (zre*zre+zim*zim) < 4; i++) {
            //     var tmp = zre*zre - zim*zim + cre;
            //     zim = 2*zre*zim + cim;
            //     zre = tmp;
            // }
            d.result.push(i);
        }
    }

    self.postMessage(d);
}

self.addEventListener("message", message);
