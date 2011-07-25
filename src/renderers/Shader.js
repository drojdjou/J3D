J3D.Shader = function(n, v, f) {
	if(!n) throw new Error("You must specify a name for custom shaders");
	if(!v || !f) throw new Error("You must pass a vertex and fragment shader source for custom shaders");
	
	this.name = n;
	this.drawMode = gl.TRIANGLES;
	
	this._vertSource = v;
	this._fragSource = f;
}

J3D.Shader.prototype.vertSource = function() {
	return this._vertSource;
}

J3D.Shader.prototype.fragSource = function() {
	return this._fragSource;
}

J3D.Shader.prototype.setup = function(mesh, shader, lights, camera) {
	
}