var v2 = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

v2.prototype.set = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
};

v2.prototype.xy = function() {
	return [this.x, this.y];
}

v2.prototype.isOne = function() {
	return this.x == 1 && this.y == 1;
}

v2.prototype.isZero = function() {
	return this.x == 0 && this.y == 0;
}


v2.ZERO = function() { return new v2(0, 0); }
v2.ONE = function() { return new v2(1, 1); }
v2.random = function() { return new v2(Math.random() * 2 - 1, Math.random() * 2 - 1); }
