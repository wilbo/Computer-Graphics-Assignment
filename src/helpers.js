import * as THREE from 'three';

const degreeToRadian = (degree) => degree * (3.14159 / 180);
const zeroPointToCorner = (width, height, depth) => new THREE.Matrix4().makeTranslation(width / 2, height / 2, depth / 2);

const helpers = {
	degreeToRadian,
	zeroPointToCorner
};

export default helpers;
