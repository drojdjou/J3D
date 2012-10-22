registerDemo(function(engine) {

    document.title = "Toon Shading | J3D";

    var post, elephant;
    var ramps = [];
    var i = 1;

    this.setup = function(callback) {

        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addShader("toon", "../demo/shaders/Toon.glsl");

        assetsLoader.addTexture("ramp2", "models/textures/toonramp2.png");
        assetsLoader.addTexture("ramp1", "models/textures/toonramp1.png");
        assetsLoader.addTexture("ramp3", "models/textures/toonramp3.png");

        assetsLoader.addJSON("elephant", "models/elephant.js");

        assetsLoader.load(function(assets) {
            onAssets(assets, callback)
        });
    }

    function onAssets(assets, callback) {
        assets.ramp1.wrapMode = gl.CLAMP_TO_EDGE;
        assets.ramp2.wrapMode = gl.CLAMP_TO_EDGE;
        assets.ramp3.wrapMode = gl.CLAMP_TO_EDGE;

        ramps = [assets.ramp1, assets.ramp2, assets.ramp3];

        engine.setClearColor(new J3D.Color(0.85, 0.85, 0.85, 1.0));

        var sun = new J3D.Transform();
        sun.light = new J3D.Light(J3D.DIRECT);
        sun.light.color = new J3D.Color(1.0); // Toon shader uses only one channel for light calculations: r
//		sun.rotation.x = Math.PI;
        sun.rotation.z = Math.PI;

        elephant = new J3D.Transform();
        elephant.rotation = new v3(0, Math.PI, 0);
        elephant.geometry = new J3D.Mesh(assets.elephant);
        elephant.renderer = assets.toon;
        elephant.renderer.uColorSampler = ramps[i];

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 12;
        camera.position.y = -1.2;
        engine.scene.setCamera(camera);
        engine.scene.add(camera, elephant, sun);

        post = new J3D.Postprocess(engine);
        post.filter = J3D.BuiltinShaders.fetch("Vignette");

        document.addEventListener('mousedown', changeTex, null);

        callback();
    }

    function changeTex() {
        i++;
        if (i == ramps.length) i = 0;
        elephant.renderer.uColorSampler = ramps[i];
    }

    this.destroy = function() {
        document.removeEventListener('mousedown', changeTex, null);
    }

    this.render = function() {
        elephant.rotation.y -= Math.PI * J3D.Time.deltaTime / 6000;
        post.render();
    }

    return this;
});