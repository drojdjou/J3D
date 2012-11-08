/**
    Creates a new three-dimensinal Vector

    @class Three dimensional vector
 */
var v3 = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

/**
 * Sets the vector components to given values
 *
 * @param x x component of the vector
 * @param y y component of the vector
 * @param z z component of the vector
 */
v3.prototype.set = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

/**
 * Sets vector values from an array in the form of [x,y,z]
 */
v3.prototype.fromArray = function(a){
    this.x = a[0];
    this.y = a[1];
    this.z = a[2];
}

/**
 * Magnitude (aka length of the vector) squared
 */
v3.prototype.magSq = function() { return this.x * this.x + this.y * this.y + this.z * this.z; };

/**
 * Magnitude (aka length of the vector)
 */
v3.prototype.mag = function() { return Math.sqrt( this.magSq() ); };

/**
 * Multiply vector by scalar
 */
v3.prototype.mul = function(s) {
	return new v3(this.x * s, this.y * s, this.z * s);
}

/**
 * Multiply vector by scalar
 */
v3.prototype.neg = function() {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	return this;
}

/**
 * Normalize
 */
v3.prototype.norm = function() {
	var m = 1 / this.mag();
	this.set(this.x * m, this.y * m, this.z * m);
	return this;
}

/**
 * Returns a copy of this vector
 */
v3.prototype.cp = function() {
	return new v3(this.x, this.y, this.z);
}

/**
 * Returns a NEW vector that is a sub of this vector and b
 */
v3.prototype.add = function(b) {
	return v3.add(this, b);
}

/**
 * Returns the vector as array of 3 numbers
 *
 * @returns array [x,y,z]
 */
v3.prototype.xyz = function() {
	return [this.x, this.y, this.z];
}

/**
 * Returns the vector as array of 3 numbers, ready to be passed as uniform
 *
 * @returns array [x,y,z]
 */
v3.prototype.toUniform = function() {
	return this.xyz();
}

/**
 * Returns a new vector that is the sum of a and b
 */
v3.add = function(a, b) {
	var c = new v3(a.x, a.y, a.z);
	c.x += b.x;
	c.y += b.y;
	c.z += b.z;

	return c;
}

/**
 * Returns a results of subtracting b from this vector
 */
v3.prototype.sub = function(b) {
	return v3.sub(this, b);
}

/**
 * Returns a results of subtracting b from a (i.e a vector from a to b)
 *
 * @param a a vector
 * @param b another vector
 */
v3.sub = function(a, b) {
	var c = new v3(a.x, a.y, a.z);
	c.x -= b.x;
	c.y -= b.y;
	c.z -= b.z;

	return c;
}

/**
 * Returns a dot product of a and b
 *
 * @param a a vector
 * @param b another vector
 */
v3.dot = function(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Returns a cross product of a and b
 *
 * @param a a vector
 * @param b another vector
 */
v3.cross = function(a, b) {
	return new v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

/**
 * Shorthand for zero vector [0,0,0]
 */
v3.ZERO = function() { return new v3(0, 0, 0); }

/**
 * Shorthand for one vector [1,1,1]
 * (can be useful for color and texture coordinates)
 */
v3.ONE = function() { return new v3(1, 1, 1); }

/**
 * Shorthand for right vector [1,0,0]
 */
v3.RIGHT = function() { return new v3(1, 0, 0); }

/**
 * Shorthand for up vector [0,1,0]
 */
v3.UP = function() { return new v3(0, 1, 0); }

/**
 * Shorthand for forward vector [0,0,-1]
 */
v3.FORWARD = function() { return new v3(0, 0, -1); }

/**
 * Returns a random vector. All components are in range -1 to 1. It is NOT normalized.
 */
v3.random = function() { return new v3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1); }
