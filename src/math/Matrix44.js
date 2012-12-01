/**
    Creates a new 4x4 Matrix

    @class The 4x4 matrix is used mostly for perspective and orthographic projection.
 */
var m44 = function(){
	this.array = [];//new Float32Array(16);
	this.identity();
}

m44.prototype.identity = function(){
    this.n11 = 1;
    this.n12 = 0;
    this.n13 = 0;
    this.n14 = 0;
	
    this.n21 = 0;
    this.n22 = 1;
    this.n23 = 0;
    this.n24 = 0;
	
    this.n31 = 0;
    this.n32 = 0;
    this.n33 = 1;
    this.n34 = 0;
	
    this.n41 = 0;
    this.n42 = 0;
    this.n43 = 0;
    this.n44 = 1;
}

/**
 * Based on https://github.com/mrdoob/three.lib/blob/master/src/core/Matrix4.lib
 *
 * @param left
 * @param right
 * @param top
 * @param bottom
 * @param near
 * @param far
 */
m44.prototype.ortho = function(left, right, top, bottom, near, far) {

	var x, y, z, w, h, p;

	w = right - left;
	h = bottom - top;
	p = far - near;
	x = ( right + left ) / w;
	y = ( bottom + top ) / h;
	z = ( far + near ) / p;

	this.n11 = 2 / w;
	this.n14 = -x;
	this.n22 = -2 / h; 
	this.n24 = y;
	this.n33 = 2 / p; 
	this.n34 = -z;

	this.makeArray();
	
	//console.log(this.array.join(","));
}

m44.prototype.perspective = function(fov, aspect, near, far){
    var t = near * Math.tan(fov * Math.PI / 360);
	var n = far - near;

	this.n11 = near / (t * aspect);
	this.n22 = near / t;
	this.n33 = -(far + near) / n; 
	this.n34 = -(2 * far * near) / n;
	this.n43 = -1;
	this.n44 = 0;
	
	this.makeArray();
};

m44.prototype.makeArray = function(){
	this.array[0] = this.n11;
	this.array[1] = this.n21;
	this.array[2] = this.n31;
	this.array[3] = this.n41;
	
	this.array[4] = this.n12;
	this.array[5] = this.n22;
	this.array[6] = this.n32;
	this.array[7] = this.n42;
	
	this.array[8] = this.n13;
	this.array[9] = this.n23;
	this.array[10] = this.n33;
	this.array[11] = this.n43;
	
	this.array[12] = this.n14;
	this.array[13] = this.n24;
	this.array[14] = this.n34;
	this.array[15] = this.n44;
}

m44.prototype.toArray = function(){
	return this.array;
}
