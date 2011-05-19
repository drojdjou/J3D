var v3 = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

v3.prototype.set = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

v3.prototype.magSq = function() { return this.x * this.x + this.y * this.y + this.z * this.z; };

v3.prototype.mag = function() { return Math.sqrt( this.magSq() ); };

v3.prototype.mul = function(s) {
	return new v3(this.x * s, this.y * s, this.z * s);
}

v3.prototype.neg = function() {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	return this;
}

v3.prototype.norm = function() {
	var m = 1 / this.mag();
	this.set(this.x * m, this.y * m, this.z * m);
	return this;
}

v3.prototype.cp = function() {
	return new v3(this.x, this.y, this.z);
}

v3.prototype.add = function(b) {
	return v3.add(this, b);
}

v3.prototype.xyz = function() {
	return [this.x, this.y, this.z];
}

v3.add = function(a, b) {
	var c = new v3(a.x, a.y, a.z);
	c.x += b.x;
	c.y += b.y;
	c.z += b.z;

	return c;
}

v3.prototype.sub = function(b) {
	return v3.sub(this, b);
}

v3.sub = function(a, b) {
	var c = new v3(a.x, a.y, a.z);
	c.x -= b.x;
	c.y -= b.y;
	c.z -= b.z;

	return c;
}

v3.dot = function(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}

v3.cross = function(a, b) {
	return new v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

v3.ZERO = function() { return new v3(0, 0, 0); }
v3.ONE = function() { return new v3(1, 1, 1); }
v3.RIGHT = function() { return new v3(1, 0, 0); }
v3.UP = function() { return new v3(0, 1, 0); }
v3.FORWARD = function() { return new v3(0, 0, 1); }
v3.random = function() { return new v3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1); }
