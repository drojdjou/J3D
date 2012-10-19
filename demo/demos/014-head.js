registerDemo(function(engine) {

    document.title = "Head | J3D";


    var path = "../demo/models/014/";

    var base, lee, eyeLeft, eyeRight, head, cam;
    var tgry, tgrz, tgpz;
    var auto;

    var defphong, cover;
    var dispersion;
    var shd = 0;

    var t = 0;

    var assets;

    this.setup = function(callback) {

        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addShader("reflective", "../demo/shaders/GoldHead.glsl");
        assetsLoader.addShader("glitter", "../demo/shaders/Glitter.glsl");
        assetsLoader.addShader("darkglass", "../demo/shaders/DarkGlass.glsl");
        assetsLoader.addShader("toon", "../demo/shaders/Stripes.glsl");

        assetsLoader.addCubemap("cubemap", {
            left: path + "cubemap/front.jpg",
            right: path + "cubemap/back.jpg",
            up: path + "cubemap/left.jpg",
            down: path + "cubemap/right.jpg",
            back: path + "cubemap/top.jpg",
            front: path + "cubemap/top.jpg"
        });

        assetsLoader.addTexture("headTex", path + "map_col.jpg");
        assetsLoader.addTexture("particleTex", path + "particle01.png");
        assetsLoader.addTexture("ramp", path + "goldramp.png");

        assetsLoader.addJSON("jsmeshes", path + "leeperry.js");
        assetsLoader.addJSON("jsscene", path + "leeperryScene.js");

        assetsLoader.load(function(a) {
            setup(a, callback)
        });
    }

    function setup(_assets, callback) {
        assets = _assets;
        
        assets.particleTex.wrapMode = gl.CLAMP_TO_EDGE;

        assets.reflective.uCubemap = assets.cubemap;
        assets.reflective.uColorTexture = assets.headTex;

        assets.darkglass.uCubemap = assets.cubemap;
        assets.darkglass.uColorTexture = assets.headTex;
        assets.darkglass.chromaticDispertion = [0.02, 0.0, -0.02];
        assets.darkglass.bias = 0.0;
        assets.darkglass.scale = 1.8;
        assets.darkglass.power = 3.0;

        assets.glitter.uColorSampler = assets.ramp;
        assets.glitter.uParticle = assets.particleTex;

        assets.toon.uColorSampler = assets.ramp;

        assets.jsscene.path = path;
        J3D.Loader.parseJSONScene(assets.jsscene, assets.jsmeshes, engine);

        base = engine.scene.find("base");
        cam = engine.scene.find("base/camera");
        lee = engine.scene.find("headbase");
        head = engine.scene.find("headbase/head");
        defphong = head.renderer;

        document.addEventListener('mousedown', changeShaderManual, null);

        auto = setInterval(changeShader, 5000);

        callback();
    }

    this.destroy = function() {
        document.removeEventListener('mousedown', changeShaderManual, null);
    }

    function setRenderer(r, m) {
        if (r != null) {
            head.renderer = r;
        } else {
            head.renderer = defphong;
        }

        if (m != null) {
            head.renderer.drawMode = m;
        }
    }

    function setTransparency(t, s, d) {
        head.geometry.setTransparency(t, s, d);
    }

    function changeShaderManual() {
        clearInterval(auto);
        changeShader();
    }

    function changeShader() {
        shd = (shd + 1) % 5;
        switch (shd) {
            case 0:
                setRenderer(null, gl.TRIANGLES);
                setTransparency(false);
                break;
            case 1:
                setRenderer(assets.darkglass, gl.TRIANGLES);
                setTransparency(false);
                break;
            case 2:
                setRenderer(assets.reflective, gl.TRIANGLES);
                setTransparency(false);
                break;
            case 3:
                setRenderer(assets.toon, gl.TRIANGLES);
                setTransparency(false);
                break;
            case 4:
                setRenderer(assets.glitter, gl.POINTS);
                setTransparency(true, gl.SRC_ALPHA, gl.DST_ALPHA);
                break;
        }
    }

    this.render = function(interactor) {
        tgry = interactor.centerX * Math.PI / 3.0;
        tgrz = -interactor.centerY * Math.PI / 15.0;
        tgpz = interactor.centerY - 1;

        lee.rotation.y += (tgry - lee.rotation.y) / 2;
        lee.rotation.z += (tgrz - lee.rotation.z) / 12;
        lee.position.z += (tgpz - lee.position.z) / 10;

        lee.rotation.x = Math.sin(t) * 0.1;
        t += 0.1;

        engine.render();
    }

    return this;
});