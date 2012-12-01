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

        assetsLoader.addShader("reflective", "../demo/shaders/SpecularReflective.glsl");
        assetsLoader.addShader("glitter", "../demo/shaders/Glitter.glsl");
        assetsLoader.addShader("darkglass", "../demo/shaders/DarkGlass.glsl");
        assetsLoader.addShader("toon", "../demo/shaders/Stripes.glsl");

//        assetsLoader.addCubemap("cubemap", {
//            left: path + "cubemap/front.jpg",
//            right: path + "cubemap/back.jpg",
//            up: path + "cubemap/left.jpg",
//            down: path + "cubemap/right.jpg",
//            back: path + "cubemap/top.jpg",
//            front: path + "cubemap/top.jpg"
//        });

        assetsLoader.addCubemap("cubemap", {
            left: "models/textures/skybox/left.jpg",
            right: "models/textures/skybox/right.jpg",
            up: "models/textures/skybox/up.jpg",
            down: "models/textures/skybox/down.jpg",
            back: "models/textures/skybox/back.jpg",
            front: "models/textures/skybox/front.jpg"
        });

        assetsLoader.addTexture("headTex", path + "map_col.jpg");
        assetsLoader.addTexture("rustTex", path + "rust.jpg", { wrapMode: gl.REPEAT });
        assetsLoader.addTexture("coverTex", path + "cover.jpg", { wrapMode: gl.REPEAT });
        assetsLoader.addTexture("rustSpecTex", path + "rustspec.jpg", { wrapMode: gl.REPEAT });
        assetsLoader.addTexture("particleTex", path + "particle01.png", { wrapMode: gl.CLAMP_TO_EDGE });
        assetsLoader.addTexture("ramp", path + "goldramp.png");

        assetsLoader.addJSON("jsmeshes", path + "leeperry.lib");
        assetsLoader.addJSON("jsscene", path + "leeperryScene.lib");

        assetsLoader.load(function(a) {
            setup(a, callback)
        });
    }

    function setup(_assets, callback) {
        assets = _assets;

        assets.particleTex.wrapMode = gl.CLAMP_TO_EDGE;

        assets.reflective.uReflTexture = assets.coverTex;
        assets.reflective.uColorTexture = assets.rustTex;
        assets.reflective.uSpecTexture = assets.rustSpecTex;
        assets.reflective.textureTile = new v2(3, 3);

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
        J3D.Loader.parseJSONScene(engine, assets.jsscene, assets.jsmeshes);

        base = engine.scene.find("base");
        cam = engine.scene.find("base/camera");
        cam.position.z -= 1;
        lee = engine.scene.find("headbase");
        head = engine.scene.find("headbase/head");
        defphong = head.renderer;

        document.addEventListener('mousedown', changeShaderManual, null);

        // auto = setInterval(changeShader, 5000);
        // changeShader();

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

        switch (shd) {
            case 0:
                setRenderer(assets.reflective, gl.TRIANGLES);
                setTransparency(false);
                head.disableDepthTest = false;
                break;
            case 1:
                setRenderer(assets.darkglass, gl.TRIANGLES);
                setTransparency(false);
                head.disableDepthTest = false;
                break;
            case 2:
                setRenderer(null, gl.TRIANGLES);
                setTransparency(false);
                head.disableDepthTest = false;
                break;
            case 3:
                setRenderer(assets.toon, gl.TRIANGLES);
                setTransparency(false);
                head.disableDepthTest = false;
                break;
            case 4:
                setRenderer(assets.glitter, gl.POINTS);
                setTransparency(true, gl.SRC_ALPHA, gl.DST_ALPHA);
                head.disableDepthTest = true;
                break;
        }

        shd = (shd + 1) % 5;
    }

    this.render = function(interactor) {
        tgry = interactor.centerX * Math.PI / 3.0;
        tgrz = -interactor.centerY * Math.PI / 15.0;
        tgpz = interactor.centerY - 1;

        lee.rotation.y += (tgry - lee.rotation.y) / 2;
        lee.rotation.z += (tgrz - lee.rotation.z) / 12;
        lee.position.z += (tgpz - lee.position.z) / 10;

        //lee.rotation.x = Math.sin(t) * 0.1;
        //t += 0.1;

        engine.render();
    }

    return this;
});