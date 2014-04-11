registerDemo(function(engine) {

    document.title = "Reflection | J3D";

    var root, monkey;

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addTexture("texture", "models/textures/reg-photo.jpg");
        assetsLoader.addJSON("monkey", "models/monkeyhi.js");
        assetsLoader.addShader("reflective", "shaders/ReflectiveSphere.glsl");

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
        monkey.geometry = new J3D.Mesh(assets.monkey);
        engine.scene.add(monkey);

        callback();
    }

    this.render = function(interactor) {

        monkey.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
        monkey.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;

        engine.render();
    }

    return this;
});