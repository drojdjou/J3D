# J3D
================

## Unity3d to Three.js exporter

A utility to export static [Unity3d](http://unity3d.com/) scenes to [Three.js](https://github.com/mrdoob/three.js)

### Usage

Drop the contents of the `unity/Editor` folder in your Unity project `Assets` folder. A new option should appear in the top menu caled J3D. 

When you have your scene ready, select all objects (or those you want to export) and select J3D > Export. A dialog will appear with some settings (docs for this coming soon). 

When you hit Export, it will create two files:

- `filenameScene.json` which contains the scene graph, materials and all the meta info
- `filename.json` which contains all geomatry data

On the three JS side, once you have your renderer and scene setup, do:

```
J3D.Loader.loadJSON("model/filename.json", function(jsmeshes) {
    J3D.Loader.loadJSON("model/filenameScene.json", function(jsscene) {
        J3D.Loader.parseJSONScene(renderer, scene, jsscene, jsmeshes);
    });
});
```

If you had objects in your Unity3d scene that are named `camera` or `cube`, you can find them in Three.js like this:

```
var cube = scene.getObjectByName('cube', true);
var camera = scene.getObjectByName('camera', true);
```

Currently the exporter makes all names lowercase (ex. `RedCube` becomes `redcube`) and replaces all spaces with underscore (`red cube` becomes `red_cube`).

### What version of Unity and Three has this been tested on?

- Unity 4.5.3f3 (it works with the free version)
- Three.js r68

### What it does export now?

- transforms hierarchy
- mesh vertices and faces
- a couple of basic materials (see below)
- ambient light
- perspective camera
- skips GameObjects that are disabled in the editor

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

### What it should probably not export?

- scripts
- shaders (*)

My idea of a way better way to deal with shaders is to map existing Unity Cg shaders to Three.js GLSL shaders.

### What format it uses?

For now it uses a custom JSON format I used for the J3D webgl engine (you can still find it in this repo in the `legacy` branch). It exports two different files, one containing the geometry info (vertices, normals etc...) and the other everything else (hierachy, transforms, material).

The `J3DLoader.js` class takes care of loading and parsing the scene, so the format doesn't really matter from the end user point of view, but the idea is to bring the format closer to [Object Scene format spec](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).

### Materials mapping

- `VertexLit` > `THREE.MeshLambertMaterial`
- `Diffuse/Specular` > `THREE.MeshPhongMaterial`

### Known issues

It doesn't cope well with multiple GameObjects having the same name - even if they are in different places in the hierarchy.

Keep in mind that textures are not supported yet.

### Contributing

Ping me [@bartekd](https://twitter.com/bartekd)