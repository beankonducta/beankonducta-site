import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let b;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xF8ABA0, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const loader = new GLTFLoader();
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 100, 0);
scene.add(directionalLight);

loader.load('https://firebasestorage.googleapis.com/v0/b/beankonducta-site.appspot.com/o/b.glb?alt=media&token=8ab0461a-a5c2-48b3-b976-9db6dd6e3b25', function (gltf) {
    b = gltf.scene;
    b.scale.set(50, 50, 50);
    b.traverse((child) => {
        if (child.isMesh) {
            console.log('mesh')
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });
    scene.add(b);

}, undefined, function (error) {

    console.error(error);

});

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

let fadeInProgress = 0;
const fadeInDuration = 1; // Duration in seconds
let fadeInAmount = 0.0001;

function animate() {
    requestAnimationFrame(animate);

    if (fadeInProgress < fadeInDuration) {
        fadeInProgress += fadeInAmount;
        fadeInAmount += 0.00001;
        const opacity = Math.min(fadeInProgress / fadeInDuration, 1);
        if (b) {
            b.traverse((child) => {
                if (child.isMesh) {
                    child.material.opacity = opacity;
                }
            });
        }
    }
    if (b) {
        b.rotation.y += 0.0012;
        b.rotation.x += 0.0022;
    }
    renderer.render(scene, camera);
}
animate();