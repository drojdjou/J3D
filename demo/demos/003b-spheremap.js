registerDemo(function(engine) {

    document.title = "Reflection | J3D";

    var root, monkey;

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addTexture("texture", "models/textures/reg-photo-2.jpg");
        assetsLoader.addJSON("monkey", "models/monkeyhi.js");
        assetsLoader.addShader("reflective", "shaders/GlassSphere.glsl");

        assetsLoader.load(function(a) {
            setup(a, callback);
        });
    }

    function setup(assets, callback) {

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera({far: 100});
        camera.position.z = 4;
        engine.scene.setCamera(camera);

        root = new J3D.Transform();
        root.add(camera);
        engine.scene.add(root);

        monkey = new J3D.Transform();
        monkey.renderer = assets.reflective;

        monkey.renderer.uTexture = assets.texture;
        monkey.renderer.chromaticDispertion = [0.98, 1.00, 1.02];
        monkey.renderer.bias = 0.1;
        monkey.renderer.scale = 1.0;
        monkey.renderer.power = 3.0;

        monkey.geometry = new J3D.Mesh(assets.monkey);
        engine.scene.add(monkey);

        callback();
    }

    this.render = function(interactor) {

        monkey.rotation.y += J3D.Time.deltaTime / 5000;

        // monkey.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
        // monkey.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;

        engine.render();
    }

    return this;
});