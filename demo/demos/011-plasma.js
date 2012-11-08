registerDemo(function(engine) {

    document.title = "Plasma | J3D";

    var ts, ct, i = 0;
    var post;

    this.setup = function(callback) {

        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addTexture("t1", "models/textures/plasma/colorramp1.png");
        assetsLoader.addTexture("t2", "models/textures/plasma/colorramp2.png");
        assetsLoader.addTexture("t3", "models/textures/plasma/colorramp3.png");
        assetsLoader.addTexture("t4", "models/textures/plasma/colorramp4.jpg");

        assetsLoader.addShader("shader", "../demo/shaders/PlasmaEffect.glsl");

        assetsLoader.load(function(a) {
            setup(a, callback)
        });
    }

    function setup(assets, callback) {

        ts = [assets.t1, assets.t2, assets.t3, assets.t4];

        ct = ts[i];

        post = new J3D.Postprocess(engine);
        post.filter = assets.shader;
        post.render = function() {
            J3D.Time.tick();
            this.renderEffect(ct.tex);
        }

        document.addEventListener('mousedown', changeTex, null);

        callback();
    }

    this.render = function() {
        post.render();
    }

    this.destroy = function() {
        document.removeEventListener('mousedown', changeTex, null);
    }

    function changeTex() {
        i++;
        if(i == ts.length) i = 0;
        ct = ts[i];
    }

    return this;
});