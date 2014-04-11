SQR.V2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

/**
 * Set the vector to the given values
 *
 * @param x x component
 * @param y y component
 */
SQR.V2.prototype.set = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    return this;
}

SQR.V2.prototype.copyTo = function(v) {
    v.x = this.x;
    v.y = this.y;
}

SQR.V2.prototype.copyFrom = function(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
}

/**
 * a.add(a, b).add(a, c) -> a + b + c
 *
 * @param a
 * @param b
 */
SQR.V2.prototype.add = function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
}

/**
 * a.sub(b, a) ->  a = from a to b
 *
 * @param a
 * @param b
 */
SQR.V2.prototype.sub = function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
}

SQR.V2.prototype.neg = function() {
    this.x *= -1;
    this.y *= -1;
    return this;
}

SQR.V2.prototype.appendVec = function(v) {
    if(!v) return this;
    this.x += v.x;
    this.y += v.y;
    return this;
}

SQR.V2.prototype.mul = function(s, v) {
    v = v || this;
    v.x = this.x * s;
    v.y = this.y * s;
    return v;
}

SQR.V2.prototype.magsq = function() {
    return this.x * this.x + this.y * this.y;
}

SQR.V2.prototype.mag = function() {
    return Math.sqrt(this.magsq());
}

SQR.V2.prototype.norm = function() {
    var m = this.mag();
    if (m == 0) return this;
    this.x /= m
    this.y /= m;
    return this;
}

SQR.V2.prototype.perpendicular = function(a, b) {
    var tx = this.x, ty = this.y;
    this.x = -ty
    this.y = tx
    return this;
}

/**
 * @returns true if it's a zero vector
 */
SQR.V2.prototype.isZero = function() {
    return this.x == 0 && this.y == 0;
}

/**
 * @returns a random vector where x and y are in range [-1, 1]
 */
SQR.V2.random = function() {
    return new SQR.V2(Math.random() * 2 - 1, Math.random() * 2 - 1);
}


SQR.V2.prototype.setAngleRadius = function(a, r) {
    this.x = Math.cos(a) * r;
    this.y = Math.sin(a) * r;
    return this;
}

SQR.V2.prototype.append = function(x, y) {
    this.x += x;
    this.y += y;
    return this;
}

SQR.V2.prototype.addAngleRadius = function(a, r) {
    this.x += Math.cos(a) * r;
    this.y += Math.sin(a) * r;
    return this;
}

SQR.V2.prototype.clone = function() {
    return new SQR.V2(this.x, this.y);
}

SQR.V2.dot = function(a, b) {
    return (a.x * b.x + a.y * b.y)
}