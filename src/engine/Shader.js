J3D.Shader = function(n, v, f) {
	if(!n) throw new Error("You must specify a name for custom shaders");
	if(!v || !f) throw new Error("You must pass a vertex and fragment shader source for custom shaders");
	
	this.name = n;
	this.drawMode = 0x0004;// <- gl.TRIANGLES, but since it can be called before J3D.Engine and gl are initialized, let's use the value directly
	
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

J3D.Shader.prototype.clone = function() {
	var c = new J3D.Shader(this.name, this._vertSource, this._fragSource);
	
	for(s in this) {
		if (typeof this[s] !== "function" && this.hasOwnProperty(s)) {
			c[s] = this[s];
		}
	}
	
	return c;
}