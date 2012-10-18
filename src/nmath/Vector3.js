J3D.V3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.array = new Float32Array([this.x, this.y, this.z]);
}

J3D.V3.prototype.set = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

J3D.V3.prototype.magsq = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
};

J3D.V3.prototype.mag = function() {
    return Math.sqrt(this.magsq());
};

J3D.V3.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
}

J3D.V3.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
}

J3D.V3.prototype.norm = function() {
    var m = 1 / this.mag();
    this.set(this.x * m, this.y * m, this.z * m);
    return this;
}

/**
 * a.add(a, b).add(a, c) -> a + b + c
 *
 * @param a
 * @param b
 */
J3D.V3.prototype.add = function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
}

/**
 * a.sub(b, a) -> set a to vector from a to b
 *
 * @param a
 * @param b
 */
J3D.V3.prototype.sub = function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
}

J3D.V3.prototype.toUniform = function() {
    this.array[0] = this.x;
    this.array[1] = this.y;
    this.array[2] = this.z;
    return this.array;
}

J3D.V3.dot = function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

J3D.V3.cross = function(a, b) {
    return new J3D.V3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

J3D.V3.ZERO = function() {
    return new J3D.V3(0, 0, 0);
}
J3D.V3.ONE = function() {
    return new J3D.V3(1, 1, 1);
}
J3D.V3.RIGHT = function() {
    return new J3D.V3(1, 0, 0);
}
J3D.V3.UP = function() {
    return new J3D.V3(0, 1, 0);
}
J3D.V3.FORWARD = function() {
    return new J3D.V3(0, 0, -1);
}
J3D.V3.random = function() {
    return new J3D.V3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
}
