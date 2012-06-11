/**
    Creates a new Collider

    @class A collider can be attached to a transform and later used with the functions in the Intersection utility to detect collisions.
 */
J3D.Collider = function() {
    this.center = v3.ZERO();
    this.type;
    this.radius;
    this.box;
    this.mesh;
}

J3D.Collider.SPHERE = 1;
J3D.Collider.BOX = 2;
J3D.Collider.MESH = 3;

J3D.Collider.Sphere = function(radius, center) {
    var c = new J3D.Collider();
    c.type = J3D.Collider.SPHERE;
    c.radius = radius || 0;
    c.center = center || v3.ZERO();
    return c;
}

J3D.Collider.Box = function(box) {
    var c = new J3D.Collider();
    c.type = J3D.Collider.BOX;
    c.box = box;
    return c;
}

J3D.Collider.Mesh = function(mesh) {
    var c = new J3D.Collider();
    c.type = J3D.Collider.MESH;
    if(!mesh.boundingBox) {
        mesh.calculateBoundingBox();
    }
    c.box = mesh.boundingBox;
    c.mesh = mesh;
    return c;
}