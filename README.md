# J3D
================

## Unity3d > Three.js exporter

A utility to export static Unity3d scenes to Threejs

### What it does export now?

- transforms hierarchy
- mesh vertices and faces
- a couple of basic materials (see below)
- ambient light
- perspective camera

### What it will export soon?

- textures
- lights
- uv (multiple channels)
- lightmaps
- more materials
- any camera type, multiple cameras

### What it could export later on?

- animations
- bones

### What it should not export?

- scripts
- shaders (*)

* A better way to do this is to map existing Unity Cg shaders to Three.js GLSL shaders

### What format it uses?

For now it uses a custom JSON format I used for the J3D webgl engine (you can still find it in this repo in the `legacy` branch). It exports two different files, one containing the geometry info (vertices, normals etc...) and the other everything else (hierachy, transforms, material).

The `J3DLoader.js` class takes care of loading and parsing the scene, so the format doesn't really matter from the end user point of view, but the idea is to bring the format closer to [Object Scene format spec](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).

### Contributing

Ping me [@bartekd](https://twitter.com/bartekd)