J3D.Postprocess = function(engine) {
	this.drawMode = gl.TRIANGLES;
	this.engine = engine;
	this.fbo = new J3D.FrameBuffer();
	
	this.geometry = J3D.Primitive.FullScreenQuad();
	this.filter = null;
}

J3D.Postprocess.prototype.render = function() {
	this.fbo.bind();
	this.engine.render();
	this.fbo.unbind();
	this.renderEffect(this.fbo.texture);
}
	
J3D.Postprocess.prototype.renderEffect = function(texture) {
	this.program = this.engine.shaderAtlas.getShader(this.filter);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(this.program);

    J3D.ShaderUtil.setAttributes(this.program, this.geometry);
	
	this.filter.uTexture = texture;
    this.filter.setup(this.program);

	gl.drawArrays(this.drawMode, 0, this.geometry.size);
}


