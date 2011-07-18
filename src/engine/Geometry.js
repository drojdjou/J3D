/*
 * 	Geometry is more flexible than Mesh.js and is designed to replace both Mesh.js and Particles.js
 * 
 *  Geometry is a collection of attributes and some settings (transparency, src and dst factors)
 *  
 *  A Mesh is just type of Geometry that has data specific to a 3D object: position, normal, texcoords ect...
 * 
 */
J3D.Geometry = function(){
	this.renderMode = J3D.RENDER_AS_OPAQUE;
	this.arrays = [];
	this.elements;
}

J3D.Geometry.prototype.addArray = function(name, data, itemSize, type, usage) {
	if(!type) type = gl.FLOAT;
	if(!usage) usage = gl.GL_STATIC_DRAW;
	this.arrays.push( new J3D.Geometry.Attribute(name, data, itemSize, type, usage, gl.ARRAY_BUFFER) );
}

J3D.Geometry.prototype.addElement = function(name, data, itemSize, type, usage) {
	if(!type) type = gl.UNSIGNED_SHORT;
	if(!usage) usage = gl.GL_STATIC_DRAW;
	this.elements = new J3D.Geometry.Attribute(name, data, itemSize, type, usage, gl.ELEMENT_ARRAY_BUFFER);
}

J3D.Geometry.Attribute = function(name, data, dataSize, type, usage, target) {
	this.name = name;
	
	this.buffer = gl.createBuffer();
	gl.bindBuffer(target, this.buffer);
	gl.bufferData(target, this.data, usage);
	
	this.size = data.length / itemSize;
	this.itemSize = itemSize;
	this.type = type;
}
