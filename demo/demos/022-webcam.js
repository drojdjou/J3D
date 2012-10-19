registerDemo(function(engine) {

    document.title = "Webcam | J3D";

    var post;

    this.setup = function(callback) {

        var setup = function(p) {
            var webcam = new UserStream(function() {

                var ctex = new J3D.Texture(webcam.output);

                p.colorOffset = [0.0, 0.0, 0.0];

                post = new J3D.Postprocess(engine);
                post.filter = p;
                post.render = function() {
                    J3D.Time.tick();
                    ctex.update();
                    this.renderEffect(ctex.tex);
                }

                callback();
            });
        }

        J3D.Loader.loadGLSL("shaders/VideoEffect.glsl", setup);
    }
    
    this.render = function(interactor) {
        post.filter.colorOffset = [interactor.centerX * -0.02, 0.0, interactor.centerY * 0.02];
        post.filter.mousePos = [interactor.centerX * 2, interactor.centerY * 2];
        post.render();
    }

    return this;
});