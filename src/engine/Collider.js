J3D.Collider = function() {
    this.center;
    this.radius;
    this.box;
}

J3D.MESH_COLLIDER = 1;
J3D.SPHERE_COLLIDER = 2;
J3D.BOX_COLLIDER = 2;


J3D.Collider.Sphere = function(radius, center) {
    var c = new J3D.Collider();
    c.type = J3D.SPHERE_COLLIDER;
    c.radius = radius || 0;
    c.center = center || v3.ZERO();
    return c;
}

J3D.Collider.Box = function(box, center) {
    var c = new J3D.Collider();
    c.type = J3D.BOX_COLLIDER;
    c.box = box;
    c.center = center || v3.ZERO();
    return c;
}