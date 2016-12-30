function C(re, im) {
    var that = {
        re: re,
        im: im
    };
    that.add = function(c) {
        return C(re + c.re, im + c.im);
    };
    // that.sub = function(c) {
    //     return C(re - c.re, im - c.im);
    // };
    // that.mul = function(c) {
    //     // (a+bi)*(c+di)
    //     // = (ac-bd) + (ad+bc)i
    //     return C(re*c.re - im*c.im, re*c.im + im*c.re);
    // };
    that.square = function() {
        // (a+bi)*(a+bi)
        // = (a^2-b^2) + (2ab)i
        return C(re*re - im*im, 2*re*im);
    };
    that.lengthSquared = function() {
        return re*re + im*im;
    };
    return that;
}

function message(e) {
    var d = e.data;

    d.result = [];
    for (var y = 0; y < d.height; y++) {
        var im = d.im_start + y * d.im_range / d.height;
        for (var x = 0; x < d.width; x++) {
            // var c = C(d.re_start + x * d.re_range / d.width, im);
            // var z = c;
            // // iterate Z(i+1) = Z(i)^2 + C as long as |Z| < 2 and i < max
            // for (var i = 0; i < d.iterations && z.lengthSquared() < 4; i++) {
            //     z = z.square().add(c);
            // }

            var cre = d.re_start + x * d.re_range / d.width;
            var cim = im;
            var zre = cre;
            var zim = cim;
            // iterate Z(i+1) = Z(i)^2 + C as long as |Z| < 2 and i < max
            for (var i = 0; i < d.iterations && (zre*zre+zim*zim) < 4; i++) {
                var tmp = zre*zre - zim*zim + cre;
                zim = 2*zre*zim + cim;
                zre = tmp;
            }

            d.result.push(i);
        }
    }

    self.postMessage(d);
}

self.addEventListener("message", message);
