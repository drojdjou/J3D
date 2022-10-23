registerDemo(function(engine) {

    var post, delta = 1;
    var textures = [];
    var textureIndex = 0;

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();
        assetsLoader.addShader('filter', "../demo/shaders/SlideshowTransitionEffect.glsl");
        assetsLoader.addTexture('photoTex01', "../demo/models/textures/photo/broadway.jpg");
        assetsLoader.addTexture('photoTex02', "../demo/models/textures/photo/fruits.jpg");
        assetsLoader.addTexture('photoTex03', "../demo/models/textures/photo/theatre.jpg");
        assetsLoader.load(function(a) {
            onAssets(a, callback)
        });
    }

    function onAssets(assets, callback) {
        textures = [assets.photoTex01, assets.photoTex02, assets.photoTex03];

        post = new J3D.Postprocess(engine);

        post.filter = assets.filter;
        post.filter.uTextureIn = textures[textureIndex % textures.length];
        post.filter.uTextureOut = textures[ (textureIndex + 1) % textures.length];

        post.render = function() {
            J3D.Time.tick();
            this.renderEffect();
        }

        document.addEventListener('mousedown', onMouseDown, false);

        callback();
    }

    function onMouseDown() {
        textureIndex += 1;
        post.filter.uTextureIn = textures[textureIndex % textures.length];
        post.filter.uTextureOut = textures[ (textureIndex + 1) % textures.length ];
        delta = 0;
    }

    this.render = function(interactor) {
        post.filter.delta = delta;
        post.filter.wDelta = 1 - Math.abs(delta * 2 - 1);
        post.render();

        if(delta < 1.0) delta += 0.02;
    }

    return this;
});