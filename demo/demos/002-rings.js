registerDemo(function(engine) {

    var rings = [];
    var root, camera;
    var ray = new J3D.Ray();

    document.title = "Rings | J3D";

    this.setup = function(callback) {

        whiteMat = J3D.BuiltinShaders.fetch("Phong");
        whiteMat.color = J3D.Color.white;

        J3D.Loader.loadJSON("models/text.json", function(jsmeshes) {
            J3D.Loader.loadJSON("models/textScene.json", function(jsscene) {

                J3D.Loader.parseJSONScene(jsscene, jsmeshes, engine);

                root = engine.scene.find("root");
                camera = engine.scene.find("camera");

                rings[0] = engine.scene.find("root/ring");
                rings[1] = engine.scene.find("root/ring/ring");
                rings[2] = engine.scene.find("root/ring/ring/ring");
                rings[3] = engine.scene.find("root/ring/ring/ring/ring");
                rings[4] = engine.scene.find("root/ring/ring/ring/ring/ring");
                rings[5] = engine.scene.find("root/ring/ring/ring/ring/ring/ring");
                rings[6] = engine.scene.find("root/ring/ring/ring/ring/ring/ring/ring");

                for (var i = 0; i < 7; i++) {
                    rings[i].originalRenderer = rings[i].renderer;
                }

                callback();
            })
        });


    }

    this.render = function(interactor) {


        var sx = interactor.centerX *  0.25;
        var sy = interactor.centerY * -0.25;

        ray = J3D.Ray.fromMousePosition(interactor.pageX, interactor.pageY, camera, null, ray);

        for (var i = 0; i < 7; i++) {
            var h = J3D.Intersection.rayTest(ray, rings[i]);
            rings[i].renderer = (h) ? whiteMat : rings[i].originalRenderer;
            rings[i].rotation.y = sx + (sx * i * 0.02);
            rings[i].rotation.x = sy + (sy * i * 0.02);
        }

        root.rotation.y = sx;

        engine.render();
    }

    return this;
});