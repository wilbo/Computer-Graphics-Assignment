import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

// Setup
//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(1, 1, -10);
camera.lookAt(new THREE.Vector3());

// Render

function animate(c, r, s, ca) {
	requestAnimationFrame(animate.bind(this, c, r, s, ca));
	c.update();
	r.render(s, ca);
}

animate(controls, renderer, scene, camera);

// Shapes
//

function box(x, y, z) {
	const geo = new THREE.BoxGeometry(x, y, z);
	const mat = new THREE.MeshNormalMaterial();
	return new THREE.Mesh(geo, mat);
}

const left = box(2, 2, 1);
left.position.x = -1.5;
const middle = box(1, 1, 1);
middle.position.y = .5;
const right = box(2, 2, 1);
right.position.x = 1.5;
const hang = box(1.5, 1, 1);
hang.position.z = .5;
hang.position.x = 1.75;
hang.position.y = .5;

scene.add(left);
scene.add(middle);
scene.add(right);
scene.add(hang);


