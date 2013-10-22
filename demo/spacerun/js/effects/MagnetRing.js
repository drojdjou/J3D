MagnetRing = function(shader) {
    var t = new J3D.Transform();
    t.position = v3.ZERO();

    t.geometry = new J3D.Geometry();

    var vertices = [];

    var numParticles = 20;

    for (var i = 0; i < numParticles; i ++) {
        vertices.push( i );
    }

    t.geometry.addArray("aVertexIndex", new Float32Array(vertices), 1);
    t.geometry.setTransparency(true, gl.SRC_ALPHA, gl.DST_ALPHA);

    t.renderer = shader;
    t.renderer.drawMode = gl.POINTS;

    t.renderer.numParticles = numParticles;
    t.renderer.radius = 0;
    t.renderer.pointSize = 32;
    t.renderer.uParticle = new J3D.Texture("assets/magnetParticle.png");

    this.transform = t;
}