J3D.Shader = function(n, v, f) {
	if(!n) throw new Error("You must specify a name for custom shaders");
	if(!v || !f) throw new Error("You must pass a vertex and fragment shader source for custom shaders");
	
	this.name = n;
	this.drawMode = 0x0004;// <- gl.TRIANGLES, but since it can be called befre eninge is initialized, let's use the value directly
	
	this._vertSource = v;
	this._fragSource = f;
}

J3D.Shader.prototype.vertSource = function() {
	return this._vertSource;
}

J3D.Shader.prototype.fragSource = function() {
	return this._fragSource;
}

J3D.Shader.prototype.setup = function(shader) {
	for(var s in shader.uniforms) {
		if (this[s] != null) J3D.ShaderUtil.setUniform(s, shader, this);
	}
}