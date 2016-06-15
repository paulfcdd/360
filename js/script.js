'use strict';

var width = window.innerWidth,
    height = window.innerHeight;

var scene = new THREE.Scene();

var webgl = document.getElementById('photo');

var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

var loader = new THREE.TextureLoader();

var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(100, 32, 32),
    new THREE.MeshBasicMaterial({
        map: loader.load('img/IMG_9835.JPG')
    })
);

sphere.scale.x = -1;

scene.add(sphere);

var controls = new THREE.OrbitControls(camera);
controls.noPan = true;
controls.noZoom = true;
controls.autoRotate = false;

webgl.appendChild(renderer.domElement);

render();

function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onMouseWheel(event) {
    event.preventDefault();

    if (event.wheelDeltaY) { // WebKit
        camera.fov -= event.wheelDeltaY * 0.05;
    } else if (event.wheelDelta) { 	// Opera / IE9
        camera.fov -= event.wheelDelta * 0.05;
    } else if (event.detail) { // Firefox
        camera.fov += event.detail * 1.0;
    }

    camera.fov = Math.max(40, Math.min(100, camera.fov));
    camera.updateProjectionMatrix();
}

document.addEventListener('mousewheel', onMouseWheel, false);
document.addEventListener('DOMMouseScroll', onMouseWheel, false);