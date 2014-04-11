registerDemo(function(engine) {

    var stars, camera, tcz = 0, tcx = 0, flightDirection = new v3();

    document.title = "Starfield | J3D | v0.12";

    var numParticles = 500000;

    this.setup = function(callback) {
        J3D.Loader.loadGLSL("particles/003-starfield.glsl", function(s) {
            onShader(s);
            callback.call(null);
        });
    }

    var insideUnitCube = function(amount) {
    var s = 3;
        var vertices = new Float32Array(amount * s);

        for (var i = 0; i < amount * s; i += s) {
            vertices[i + 0] = Math.random();
            vertices[i + 1] = Math.random();
            vertices[i + 2] = Math.random();
        }
        
        return vertices;
    }

    function onShader(s) {
        camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 0;
        engine.scene.setCamera(camera);

        stars = new J3D.Transform();
        stars.renderer = s;
        stars.renderer.uSize = 50;
        stars.renderer.uSpeed = new v3();
        stars.renderer.drawMode = gl.POINTS;

        stars.geometry = new J3D.Geometry();
        stars.geometry.addArray("aVertexPosition", insideUnitCube(numParticles), 3);

        engine.scene.add(stars, camera);
    }

    this.render = function(interactor) {
        // stars.rotation.y += interactor.centerX * J3D.Time.deltaTime / 1000;
        // stars.rotation.x += interactor.centerY * J3D.Time.deltaTime / 2000;

        flightDirection.x = -interactor.centerX;
        flightDirection.y = -interactor.centerY;
        flightDirection.z = 0.01;

        flightDirection.norm();
        flightDirection.mult(0.001);

        stars.renderer.uSpeed.add(flightDirection);

        tcz = interactor.centerX * Math.PI * 1;
        tcx = interactor.centerY * Math.PI * 1;
        camera.rotation.y += (tcz - camera.rotation.y) * 0.1;
        camera.rotation.x += (tcx - camera.rotation.x) * 0.1;

        engine.render();
    }

    return this;
});