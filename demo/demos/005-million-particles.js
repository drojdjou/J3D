registerDemo(function(engine) {

    var stars;

    document.title = "Lots of particles | J3D | v0.12";

    var numParticles = 1000000;

    this.setup = function(callback) {
        J3D.Loader.loadGLSL("../demo/shaders/MillionParticles.glsl", function(s) {
            onShader(s);
            callback.call(null);
        });
    }

    function onShader(s) {
        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 100;
        engine.scene.setCamera(camera);

        stars = new J3D.Transform();
        stars.renderer = s
        stars.renderer.drawMode = gl.POINTS;

        stars.geometry = new J3D.Geometry();
        stars.geometry.addArray("aVertexPosition", J3D.ParticleUtil.insideCube(numParticles, 400), 3);
        stars.geometry.addArray("aVertexColor", J3D.ParticleUtil.randomColors(numParticles, 0.5), 4);

        engine.scene.add(stars, camera);
    }

    this.render = function(interactor) {
        stars.renderer.uColor = [1 - (interactor.centerX + 0.5), interactor.centerX + 0.5, 1, 1];
        stars.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
        stars.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;

        engine.render();
    }

    return this;
});