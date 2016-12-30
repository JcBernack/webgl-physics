var log2 = Math.log(2);
var escape = 2 << 16;
var escape2 = escape*escape;

function message(e) {
    var d = e.data;
    d.result = [];
    for (var y = 0; y < d.height; y++) {
        var cim = d.im_start + y * d.im_range / d.height;
        for (var x = 0; x < d.width; x++) {
            var cre = d.re_start + x * d.re_range / d.width;
            var zre = cre;
            var zim = cim;
            // iterate Z(i+1) = Z(i)^2 + C as long as |Z| < 2 and i < max
            for (var i = 0; i < d.iterations && (zre*zre + zim*zim) < escape2; i++) {
                var tmp = zre*zre - zim*zim + cre;
                zim = 2*zre*zim + cim;
                zre = tmp;
            }
            // source: https://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_.28smooth.29_coloring
            if (i < d.iterations) {
                var log_z = Math.log(zre*zre + zim*zim) / 2;
                i = i + 1 - Math.log(log_z / log2) / log2;
            }
            d.result.push(i);
        }
    }
    self.postMessage(d);
}

self.addEventListener("message", message);
