import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import brick from './assets/brick.jpg';
var helper = require('./helper.js');

// Setup
//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
	light.castShadow = true;
	light.position.set(15, 30, 20);
	scene.add(light);
}

drawSun(scene);

function drawHemisphereLight(scene) {
	const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
	scene.add(light);
}

drawHemisphereLight(scene);

function drawGround(scene) {
	const geometry = new THREE.PlaneGeometry(100, 100);
	geometry.lookAt(new THREE.Vector3(0, 10, 0));
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
	const plane = new THREE.Mesh(geometry, material);
	plane.receiveShadow = true;
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
		const mesh = new THREE.Mesh(geometry, material);
		mesh.castShadow = true;
		return mesh;
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


function drawNewBuilding(width,height,depth,x,z,y){
		//create a cube as per usual
		const geometry = new THREE.CubeGeometry(width, height, depth);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(width / 2, height / 2, -(depth / 2)));
		var cubeMesh = new THREE.Mesh(
				geometry,
				new THREE.MeshLambertMaterial()
		);
		scene.add(cubeMesh);

		//change vertex positions
		cubeMesh.geometry.vertices[1].y += 1;
		cubeMesh.geometry.vertices[4].y += 1;
		cubeMesh.position.set(x,z,y);
		//cubeMesh.rotateY(90 * (3.14/180));
		cubeMesh.rotateY(helper.degreeToRadian(90));
		//indicate that the vertices need update
		cubeMesh.geometry.verticesNeedUpdate = true;
		//return cubeMesh;
	//}
	//scene.add(building(1,2,3));
}

drawNewBuilding(1, 4, 1, 5, 0, 0);
