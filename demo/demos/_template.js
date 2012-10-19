registerDemo(function(engine) {

    document.title = " | J3D";

    this.setup = function(callback) {
        callback();
    }

    this.render = function() {
        engine.render();
    }

    return this;
});