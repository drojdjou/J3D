registerDemo(function(engine) {

    document.title = "Particle stream | J3D";

    var numParticles = 7500;

    var particleShader = 'particleShader';
    var particleTexture = 'particleTexture';

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();
        assetsLoader.addShader(particleShader, "../demo/shaders/AnimatedParticles.glsl");
        assetsLoader.addTexture(particleTexture, "models/textures/smoke.png");
        assetsLoader.load(function(a) { onAssets(a, callback) });
    }

    function onAssets(a, c) {
        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 100;
        engine.scene.setCamera(camera);

        var stars = new J3D.Transform();

        stars.renderer = a[particleShader];
        stars.renderer.drawMode = gl.POINTS;
        stars.renderer.uColor = [0.8, 0.3, 0.2, 1];
        stars.renderer.uParticleTex = a[particleTexture];
        
        stars.disableDepthTest = true;

        stars.geometry = new J3D.Geometry();
        stars.geometry.addArray("aVertexPosition", distributeAngles(numParticles), 3);
        stars.geometry.addArray("aVertexColor", J3D.ParticleUtil.randomColors(numParticles, 0, 1), 4);
        stars.geometry.addArray("aVertexAnimation", prepareAnimationAttributes(numParticles, 8), 2);

        stars.geometry.setTransparency(true, gl.SRC_ALPHA, gl.DST_ALPHA);

        engine.scene.add(stars, camera);

        c();
    }

    function prepareAnimationAttributes(amount, maxOffset) {
        var animdata = new Float32Array(amount * 2);

        for (var i = 0; i < amount * 2; i++) {
            animdata[i] = i / (amount * 2) + Math.random() * 0.05;
        }

        return animdata;
    }

    function distributeAngles(amount, origin) {
        var vertices = new Float32Array(amount * 3);

        var step = Math.PI * 0.25 / amount;

        origin = origin || v3.ZERO();

        for (var i = 0; i < amount * 3; i += 3) {
            vertices[i] = step * i / 3;
            vertices[i + 1] = Math.random();
            vertices[i + 2] = (1 + ((amount * 1.5) - Math.abs(i - amount * 1.5)) / (amount * 0.15)) * (0.1 + Math.random());
        }

        return vertices;
    }

    this.render = function() {
        engine.render();
    }

    return this;
});