SQR.V3 = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 1;
}

SQR.V3.prototype.set = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 1;
    return this;
}

SQR.V3.prototype.append = function(x, y, z, w) {
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    this.w += w || 0;
    return this;
}

SQR.V3.prototype.appendVec = function(v) {
    if(!v) return this;
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
}

SQR.V3.prototype.copyTo = function(p) {
    p.x = this.x;
    p.y = this.y;
    p.z = this.z;
    p.w = this.w;
    return p;
}

SQR.V3.prototype.copy = function(v) {
    v = v || new SQR.V3();
    v.set(this.x, this.y, this.z, this.w);
    return v;
}

SQR.V3.prototype.copyFrom = function(p) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    this.w = p.w;
    return this;
}

SQR.V3.prototype.magsq = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
};

SQR.V3.prototype.mag = function() {
    return Math.sqrt(this.magsq());
};

SQR.V3.prototype.isZero = function() {
    return this.x == 0 && this.y == 0 && this.z == 0;
};

SQR.V3.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
}

SQR.V3.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
}

SQR.V3.prototype.norm = function() {
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
SQR.V3.prototype.add = function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
}

/**
 * a.sub(b, a) ->  a = from a to b
 *
 * @param a
 * @param b
 */
SQR.V3.prototype.sub = function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
}

SQR.V3.dot = function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

SQR.V3.prototype.clone = function() {
    return new SQR.V3(this.x, this.y, this.z);
}

SQR.V3.prototype.cross = function(a, b) {
    var x = a.y * b.z - a.z * b.y;
    var y = a.z * b.x - a.x * b.z;
    var z = a.x * b.y - a.y * b.x;
    this.set(x, y, z, this.w);
    return this;
}

SQR.V3.up = new SQR.V3(0,1,0);
SQR.V3.forward = new SQR.V3(0,0,-1);
