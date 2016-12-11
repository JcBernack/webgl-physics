var FBO = function (exports) {

    var scene, orthoCamera, rtt;
    exports.init = function (width, height, renderer, simulationMaterial, renderMaterial) {
        //3 rtt setup
        scene = new THREE.Scene();
        orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);

        //4 create a target texture
        var options = {
            minFilter: THREE.NearestFilter,//important as we want to sample square pixels
            magFilter: THREE.NearestFilter,//
            format: THREE.RGBFormat,//could be RGBAFormat
            type: THREE.FloatType//important as we need precise coordinates (not ints)
        };
        rtt = new THREE.WebGLRenderTarget(width, height, options);

        //5 the simulation:
        //create a bi-unit quadrilateral and uses the simulation material to update the Float Texture
        var geom = new THREE.BufferGeometry();
        geom.addAttribute("position", new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
        geom.addAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), 2));
        scene.add(new THREE.Mesh(geom, simulationMaterial));


        //6 the particles:
        //create a vertex buffer of size width * height with normalized coordinates
        var l = (width * height );
        var vertices = new Float32Array(l * 3);
        for (var i = 0; i < l; i++) {
            var i3 = i * 3;
            vertices[i3] = (i % width) / width;
            vertices[i3 + 1] = (i / width) / height;
        }

        //create the particles geometry
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));

        //the rendermaterial is used to render the particles
        exports.particles = new THREE.Points(geometry, renderMaterial);
        exports.renderer = renderer;

    };

    //7 update loop
    exports.update = function () {

        //1 update the simulation and render the result in a target texture
        exports.renderer.render(scene, orthoCamera, rtt, true);

        //2 use the result of the swap as the new position for the particles' renderer
        exports.particles.material.uniforms.positions.value = rtt;

    };
    return exports;
}({});
