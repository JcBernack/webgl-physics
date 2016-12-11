var scene;
var camera;
var renderer;
var geometry;
var material;
var mesh;

function init() {
    scene = new THREE.Scene();

    // camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 400));
    geometry.vertices.push(new THREE.Vector3(400, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 400, 0));
    // material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
    material = new THREE.PointCloudMaterial( { size: 10, sizeAttenuation: true } );

    mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", resize);
    resize(null);
}

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    mesh.geometry.vertices[0].x += 1;
    //mesh.geometry.verticesNeedUpdate = true;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    mesh.rotation.z += 0.03;
    renderer.render(scene, camera);
}

init();
animate();
