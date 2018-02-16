import * as THREE from 'three';

const degreeToRadian = (degree) => degree * (3.14159 / 180);
const zeroPointToCorner = (width, height, depth) => new THREE.Matrix4().makeTranslation(width / 2, height / 2, depth / 2);
const filePath = (p) => process.env.NODE_ENV === 'production' ? p : 'dist/' + p;

const helpers = {
	degreeToRadian,
	zeroPointToCorner,
	filePath
};

export default helpers;
