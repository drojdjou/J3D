registerDemo(function(engine) {

    document.title = "Reflection | J3D";

    var root;

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addCubemap("cubemap", {
            left: "models/textures/skybox/left.jpg",
            right: "models/textures/skybox/right.jpg",
            up: "models/textures/skybox/up.jpg",
            down: "models/textures/skybox/down.jpg",
            back: "models/textures/skybox/back.jpg",
            front: "models/textures/skybox/front.jpg"
        });

        assetsLoader.addJSON("monkey", "models/monkeyhi.js");
        assetsLoader.addShader("reflective", "shaders/Reflective.glsl");

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

        console.log(assets.cubemap);

        engine.scene.addSkybox(assets.cubemap);

        var monkey = new J3D.Transform();
        monkey.renderer = assets.reflective;
        monkey.renderer.uCubemap = assets.cubemap;
        monkey.geometry = new J3D.Mesh(assets.monkey);
        engine.scene.add(monkey);

        callback();
    }

    this.render = function(interactor) {

        root.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
        root.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;

        engine.render();
    }

    return this;
});