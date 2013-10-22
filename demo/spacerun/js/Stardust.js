Stardust = function(camera, shader, game) {
    that = this;

    this.game = game;

    var t = new J3D.Transform();

    var bounds = J3D.MathUtil.getBoundsAtDistance(camera.camera, Math.abs(camera.position.y + Settings.yspanStars));

    t.geometry = new J3D.Geometry();

    var vertices = [];

    for (var i = 0; i < Settings.numStars; i ++) {
        vertices.push( -bounds.w + Math.random() * 2 * bounds.w );
        vertices.push( Settings.yspanStars * -Math.random() );
        vertices.push( -bounds.h + Math.random() * 2 * bounds.h );
    }

    t.geometry.addArray("aVertexPosition", new Float32Array(vertices), 3);

    t.renderer = shader;
    t.renderer.drawMode = gl.POINTS;
    t.renderer.color = J3D.Color.white;
    t.renderer.bound = bounds.h;
    t.renderer.yspan = Settings.yspanStars;
    t.renderer.offset = 0;

    this.transform = t;

    this.move = function() {
        var s = (this.game.level) ? this.game.level.speed * Settings.starsSpeedMult : 1;
        this.transform.renderer.offset += J3D.Time.deltaTime / 1000 * s;
    }
}