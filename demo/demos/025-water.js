J3D.Water = function(engine) {
    this.drawMode = gl.TRIANGLES;
    this.engine = engine;

    this.waterHeightmap = new J3D.FrameBuffer();

    this.geometry = J3D.Primitive.FullScreenQuad();

    this.waterHeightmapGenerator = null;
    this.waterShader = null;

    this.samplingOffset = 0.02;

    this.render = function(mx, my) {
        var program;

        J3D.Time.tick();

        this.waterHeightmap.bind();

        program = this.engine.shaderAtlas.getShader(this.waterHeightmapGenerator);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        J3D.ShaderUtil.setAttributes(program, this.geometry);
        this.waterHeightmapGenerator.setup(program);
        gl.drawArrays(this.drawMode, 0, this.geometry.size);

        this.waterHeightmap.unbind();

        program = this.engine.shaderAtlas.getShader(this.waterShader);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);

        this.waterShader.samplingOffset = this.samplingOffset;
        this.waterShader.lightPosition = [mx * 2, my * -2];
        J3D.ShaderUtil.setTexture(program, 0, "uTexture", this.waterHeightmap.texture);

        J3D.ShaderUtil.setAttributes(program, this.geometry);
        this.waterShader.setup(program);
        gl.drawArrays(this.drawMode, 0, this.geometry.size);
    }
}

registerDemo(function(engine) {

    document.title = "Water | J3D";

    var post;
    var mx = 0, my = 0;

    this.setup = function(callback) {

        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addShader("perlin", "../demo/shaders/PerlinNoise.glsl");
        assetsLoader.addShader("water", "../demo/shaders/WaterFilter.glsl");

        assetsLoader.load(function(a) {
            setup(a, callback)
        });
    }

    function setup(assets, callback) {

        post = new J3D.Water(engine);
        post.waterHeightmapGenerator = assets.perlin;
        post.waterShader = assets.water;

        document.addEventListener('mousemove', function(e) {
            mx = e.pageX / window.innerWidth * 2 - 1;
            my = e.pageY / window.innerHeight * 2 - 1;
        }, false);

        callback();
    }

    this.render = function() {
        post.render(mx, my);
    }


    return this;
});