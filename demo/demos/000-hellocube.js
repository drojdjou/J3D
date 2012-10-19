registerDemo(function(engine) {

    var cube;

    var version = "0.1";
    document.title = "Hello Cube | J3D | v" + version;

    this.setup = function(callback) {

        engine.setClearColor(J3D.Color.black);

        var ambient = new J3D.Transform();
        ambient.light = new J3D.Light(J3D.AMBIENT);
        ambient.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);

        var light = new J3D.Transform();
        light.light = new J3D.Light(J3D.DIRECT);
        light.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);
        light.rotation = new v3(-Math.PI, 0, Math.PI);

        cube = new J3D.Transform();
        cube.geometry = J3D.Primitive.Cube(1, 1, 1);
        cube.renderer = J3D.BuiltinShaders.fetch("Phong");
        cube.renderer.color = new J3D.Color(1, 0, 0, 1);

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 4;
        engine.camera = camera;

        engine.scene.add(camera, cube, light, ambient);

        callback.call(null);
    }

    this.render = function() {
        cube.rotation.x += Math.PI * J3D.Time.deltaTime / 6000;
        cube.rotation.y += Math.PI / 2 * J3D.Time.deltaTime / 3000;
        engine.render();
    }

    return this;
});