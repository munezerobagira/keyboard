import * as Three from 'three';
import * as ThreeMeshUI from 'three-mesh-ui';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Keyboard } from './lib/keyboard';
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer();
new OrbitControls(camera, renderer.domElement);

camera.position.z = 15;
camera.position.x = -5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

const keyboard = new Keyboard();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

scene.add(keyboard.keyboardGroup);
document.body.append(renderer.domElement);
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container')?.appendChild(warning);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
