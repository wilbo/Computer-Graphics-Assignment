import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import brick from './assets/brick.jpg';

// Setup
//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(1, 1, 10);
camera.lookAt(new THREE.Vector3());

// Render

function animate(c, r, s, ca) {
	window.requestAnimationFrame(animate.bind(this, c, r, s, ca));
	c.update();
	r.render(s, ca);
}

animate(controls, renderer, scene, camera);

// Shapes en Stuff
//

function drawSun(scene) {
	const light = new THREE.PointLight(0xffffff, 1, 100);
	light.position.set(10, 10, 10);
	scene.add(light);
}

drawSun(scene);

function drawHemisphereLight(scene) {
	const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);
	scene.add(light);
}

drawHemisphereLight(scene);

function drawGround(scene) {
	const geometry = new THREE.PlaneGeometry(100, 100);
	geometry.lookAt(new THREE.Vector3(0, 10, 0));
	const material = new THREE.MeshBasicMaterial({color: 0xeeeeee});
	const plane = new THREE.Mesh(geometry, material);
	scene.add(plane);
}

drawGround(scene);

function drawAppartments(scene) {
	function box(x, y, z) {
		const geometry = new THREE.BoxGeometry(x, y, z);
		// set its 0 point in a corner
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x / 2, y / 2, -(z / 2)));
		const material = new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load(brick)
		});
		return new THREE.Mesh(geometry, material);
	}

	const left = box(2, 2, 2);
	left.position.x = -2;
	const middle = box(1, 1, 2);
	middle.position.y = 1;
	const right = box(2, 2, 2);
	right.position.x = 1;
	const hang = box(1.5, 1, 1);
	hang.position.z = 0.5;
	hang.position.x = 1.5;
	hang.position.y = 1;

	scene.add(left);
	scene.add(middle);
	scene.add(right);
	scene.add(hang);
}

drawAppartments(scene);
