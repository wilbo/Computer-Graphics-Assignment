# Computer Graphics Assignment

### Install instructions

A recent version of [NodeJS](https://nodejs.org/en/) is required.

Run the following commands after cloning the repository:

```bash
# add this package globally
$ npm install -g parcel-bundler

# run this inside project root 
$ npm install # install dependencies
$ npm start # dev build and browse to http://localhost:1234
```

### Task
Create a scene, similar to a short movie scene, of your neighborhood (close to where you live)
with real-world objects: street, building, trees, cars, etc..

### Requirements
- At least 2 buildings and 4 distinct geometries (e.g, cylinder for lampposts and trees,
BoxGeometry and triangles for houses, multiple spheres for tree canopy)
- At least 2 imported models
- At least 5 material properties, e.g., color & shading
- Demonstrate texture mapping of objects (at least stones of buildings)
- 1 light = sun
- A skybox (see http://www.custommapmakers.org/skyboxes.php or
http://www.humus.name/index.php?page=Textures)
- Demonstrate transformation ( translation, rotation, etc..) to create some animation, e.g.,
make car(s) move
- Include OrbitControls.js
- Movement of camera with keyboard controls
