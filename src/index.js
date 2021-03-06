import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import brick from './assets/brick.jpg';
import window1 from './assets/window.jpg';
import road from './assets/road.jpg';
import glass from './assets/glass.jpg';
import skybox1 from './assets/skybox/devils_advocate_lf.jpg';
import skybox2 from './assets/skybox/devils_advocate_rt.jpg';
import skybox3 from './assets/skybox/devils_advocate_up.jpg';
import skybox4 from './assets/skybox/devils_advocate_dn.jpg';
import skybox5 from './assets/skybox/devils_advocate_ft.jpg';
import skybox6 from './assets/skybox/devils_advocate_bk.jpg';
import helpers from './helpers';

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
	const geometry = new THREE.PlaneGeometry(1000, 1000);
	geometry.lookAt(new THREE.Vector3(0, 10, 0));
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
	const plane = new THREE.Mesh(geometry, material);
	plane.receiveShadow = true;
	scene.add(plane);
}

drawGround(scene);

function drawAppartments(scene) {
	function box(width, height, depth) {
		const geometry = new THREE.BoxGeometry(width, height, depth);
		geometry.applyMatrix(helpers.zeroPointToCorner(width, height, -depth));
		const texture = new THREE.TextureLoader().load(brick);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(width * 2, height * 2);

		const material = new THREE.MeshLambertMaterial({ map: texture });
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

	drawWindow1(scene, -2, 1, -0.99);
	drawWindow1(scene, -1, 1, -0.99);
	drawWindow1(scene, -2, 0, -0.99);
	drawWindow1(scene, -1, 0, -0.99);
	drawWindow1(scene, 1, 0, -0.99);
	drawWindow1(scene, 2, 0, -0.99);
	drawWindow1(scene, 1.75, 1, -0.49);
}

drawAppartments(scene);

function drawNewBuilding(width, height, depth, x, z, y) {
	const geometry = new THREE.CubeGeometry(width, height, depth);
	geometry.applyMatrix(helpers.zeroPointToCorner(width, height, depth));
	const texture = new THREE.TextureLoader().load(glass);
	const material = new THREE.MeshLambertMaterial({ map: texture });
	const cubeMesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(material));

	cubeMesh.castShadow = true;
	cubeMesh.geometry.vertices[1].y += 1;
	cubeMesh.geometry.vertices[4].y += 1;
	cubeMesh.position.set(x, z, y);
	cubeMesh.rotateY(helpers.degreeToRadian(90));
	cubeMesh.geometry.verticesNeedUpdate = true;

	scene.add(cubeMesh);
}

drawNewBuilding(3, 8, 2, 10, 0, 10);

function drawWindow1(scene, x, y, z) {
	const geometry = new THREE.PlaneGeometry(0.6, 0.4);
	geometry.applyMatrix(helpers.zeroPointToCorner(0.6, 0.4, 2));
	const texture = new THREE.TextureLoader().load(window1);
	const material = new THREE.MeshLambertMaterial({ map: texture });
	const plane = new THREE.Mesh(geometry, material);
	plane.position.set(x + 0.2, y + 0.3, z);
	scene.add(plane);
}

function drawTree(scene, width, height, depth, x, y, z) {
	const radiusTop = width / 16;
	const radiusBottom = width / 14;
	const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
	geometry.applyMatrix(helpers.zeroPointToCorner(width, height, depth));
	const material = new THREE.MeshLambertMaterial({ color: 0x916f3e });
	const treePole = new THREE.Mesh(geometry, material);
	treePole.position.set(x, y, z);

	const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
	geometry2.applyMatrix(helpers.zeroPointToCorner(width, height, depth));
	const material2 = new THREE.MeshLambertMaterial({color: 0x638c48});
	const leafs = new THREE.Mesh(geometry2, material2);
	leafs.position.set(x, Math.random() * 0.5 + 0.5 + y, z);

	const geometry3 = new THREE.SphereGeometry(0.4, 32, 32);
	geometry3.applyMatrix(helpers.zeroPointToCorner(width, height, depth));
	const material3 = new THREE.MeshLambertMaterial({color: 0x638c48});
	const leafs2 = new THREE.Mesh(geometry3, material3);
	leafs2.position.set(x, Math.random() * 0.5 + 0.75 + y, z);

	treePole.castShadow = true;
	leafs.castShadow = true;
	leafs2.castShadow = true;

	scene.add(treePole);
	scene.add(leafs);
	scene.add(leafs2);
}

function drawTrees(scene) {
	for (let i = -10; i < 10; i++) {
		drawTree(scene, 1, 1, 1, i * 2, 0, 6);
	}
}

drawTrees(scene);

function drawRoad(scene) {
	const geometry = new THREE.PlaneGeometry(1000, 4, 32);
	geometry.lookAt(new THREE.Vector3(0, 10, 0));
	const texture = new THREE.TextureLoader().load(road);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 120);
	texture.rotation = helpers.degreeToRadian(90);
	const material = new THREE.MeshLambertMaterial({ map: texture });
	const plane = new THREE.Mesh(geometry, material);
	plane.position.set(0, 0.01, 4);
	plane.receiveShadow = true;
	scene.add(plane);
}

drawRoad(scene);

let beetle = null;
let beetlePos = 100;
function driveBeetle(speed) {
	if (beetle !== null) {
		beetle.position.set(beetlePos - 50, 0.3, 3);
		beetlePos = beetlePos === 0 ? 100 : beetlePos - speed;
	}
}

function drawBeetle(scene) {
	const objectLoader = new THREE.ObjectLoader();
	// Dont forget to copy the json file over to the dist folder
	objectLoader.load(helpers.filePath('beetle/beetle.json'), (obj) => {
		beetle = obj;
		beetle.scale.set(0.001, 0.001, 0.001);
		beetle.rotation.set(0, helpers.degreeToRadian(90), 0);
		scene.add(beetle);
	});
}

drawBeetle(scene);

function drawPlane(scene) {
	const objectLoader = new THREE.ObjectLoader();
	objectLoader.load(helpers.filePath('plane/fighter-plane.json'), (obj) => {
		const plane = obj;
		plane.scale.set(1, 1, 1);
		plane.rotation.set(0, helpers.degreeToRadian(90), 0);
		plane.position.set(10, 10, 10);
		scene.add(plane);
	});
}

drawPlane(scene);

let dumpTruck = null;
let dumpTruckPos = 0;
function driveDumpTruck(speed) {
	if (dumpTruck !== null) {
		dumpTruck.position.set(dumpTruckPos - 50, 0, 5);
		dumpTruckPos = dumpTruckPos >= 100 ? 0 : dumpTruckPos + speed;
	}
}

function drawDumpTruck(scene) {
	const objectLoader = new THREE.ObjectLoader();
	// Dont forget to copy the json file over to the dist folder
	objectLoader.load(helpers.filePath('dump-truck/mining-dump-truck.json'), (obj) => {
		dumpTruck = obj;
		dumpTruck.scale.set(0.008, 0.008, 0.008);
		dumpTruck.rotation.set(0, helpers.degreeToRadian(270), 0);
		scene.add(dumpTruck);
	});
}

drawDumpTruck(scene);

function drawSkyBox(scene) {
	const directions = [skybox1, skybox2, skybox3, skybox4, skybox5, skybox6];
	const materialArray = [];
	for (let i = 0; i < 6; i++) {
		materialArray.push(new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture(directions[i]),
			side: THREE.BackSide
		}));
	}

	const skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
	const skyMaterial = new THREE.MeshFaceMaterial(materialArray);
	const skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
	skyBox.position.set(0, 100, 0);
	scene.add(skyBox);
}

drawSkyBox(scene);

// Render

function animate(c, r, s, ca) {
	window.requestAnimationFrame(animate.bind(this, c, r, s, ca));

	driveBeetle(0.25);
	driveDumpTruck(0.15);

	c.update();
	r.render(s, ca);
}

animate(controls, renderer, scene, camera);
