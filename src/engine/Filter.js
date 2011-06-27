J3D.Filter = function(name, effectSource){
	this.name = name;
	this.drawMode = gl.TRIANGLES;
	this._vertSource = J3D.EffectSource.DefaultVertex;
	this._fragSource = effectSource;
};

J3D.Filter.prototype.vertSource = function() {
	return this._vertSource;
}

J3D.Filter.prototype.fragSource = function() {
	return this._fragSource;
}

J3D.Filter.prototype.setup = function(program) {
	this.fbo = new J3D.FrameBuffer();
}

J3D.Filter.prototype.prepare = function(postprocess, program) {
	this.fbo.bind()
}

J3D.Filter.prototype.apply = function(postprocess, program) {
	this.fbo.unbind();
	postprocess.drawQuad(this.fbo.texture, program, null); // <- null = draw to screen
}
