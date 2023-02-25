import * as THREE from '../node_modules/three';

const scene = new THREE.Scene()

//PerspectiveCamera(FOV, AspectRatio, near, far)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Creates new renderer instance 
const renderer = new THREE.WebGLRenderer();

// Sets size of screen will fill app with
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z=5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate();