function message(e) {
    var d = e.data;
    d.result = [];
    for (var y = 0; y < d.height; y++) {
        var im = d.im_start + y * d.im_range / d.height;
        for (var x = 0; x < d.width; x++) {
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
