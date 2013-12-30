/**

All particles are on sphere

*/


registerDemo(function(engine) {

    var stars;

    var title = "Million particles moving individually | J3D | ";
    document.title = "v0.1";

    var numParticles = 1000000;

    this.setup = function(callback) {
        J3D.Loader.loadGLSL("particles/002-individual.glsl", function(s) {
            onShader(s);
            callback.call(null);
        });
    }

    var insideCube = function(amount) {
        var s = 3;
        var vertices = new Float32Array(amount * s);
        
        var origin = v3.ZERO();   
        var sizeX = 70;
        var sizeZ = 70;

        for (var i = 0; i < amount * s; i += s) {
            var px = Math.random() * sizeX * 2.0 - sizeX + Math.random();
            var sizeY = (1 - Math.abs(px)/70) * 100;
            vertices[i] = origin.x + px;
            vertices[i + 1] = origin.y + Math.random() * sizeY * 2.0 - sizeY + Math.random();
            vertices[i + 2] = origin.z + Math.random() * sizeZ * 2.0 - sizeZ + Math.random();
        }
        
        return vertices;
    }

    var onShader = function(s) {
        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 250;
        engine.scene.setCamera(camera);

        stars = new J3D.Transform();
        stars.renderer = s;
        stars.renderer.thickness = 100;
        stars.renderer.drawMode = gl.POINTS;

        stars.geometry = new J3D.Geometry();
        stars.geometry.addArray("aVertexData", insideCube(numParticles), 3);
        stars.geometry.addArray("aVertexColor", J3D.ParticleUtil.randomColors(numParticles, 0, 1), 4);

        stars.rotation.x = Math.PI / -4;

        engine.scene.add(stars, camera);
    }

    this.render = function(interactor) {
        stars.renderer.uColor = [1 - (interactor.centerX + 0.5), interactor.centerX + 0.5, 1, 1];
        // stars.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
        stars.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;

        engine.render();
    }

    return this;
});