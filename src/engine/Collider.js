J3D.Collider = function() {
    this.center = v3.ZERO();

    this.radius;
    this.box;
    this.mesh;
}

J3D.Collider.Sphere = function(radius, center) {
    var c = new J3D.Collider();
    c.radius = radius || 0;
    c.center = center || v3.ZERO();
    return c;
}

J3D.Collider.Box = function(box, center) {
    var c = new J3D.Collider();
    c.box = box;
    c.center = center || v3.ZERO();
    return c;
}

J3D.Collider.Mesh = function(mesh) {
    var c = new J3D.Collider();
    c.box = mesh.boundingBox;
    c.mesh = mesh;
    return c;
}