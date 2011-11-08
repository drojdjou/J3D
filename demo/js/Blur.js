J3D.BoxBlur = function(engine) {
	this.drawMode = gl.TRIANGLES;
	this.engine = engine;

	this.blurX = new J3D.FrameBuffer();
	this.blurY = new J3D.FrameBuffer();

	this.geometry = J3D.Primitive.FullScreenQuad();
	this.filter = null;
    this.delta = [0.0, 0.0]
}

J3D.BoxBlur.prototype.render = function() {
	this.blurX.bind();
	this.engine.render();
	this.blurX.unbind();

    this.blurY.bind();
	this.renderEffect(this.blurX.texture, [this.delta[0], 0.0]);
    this.blurY.unbind();

    this.renderEffect(this.blurY.texture, [0.0, this.delta[0]]);
}
	
J3D.BoxBlur.prototype.renderEffect = function(texture, delta) {
	this.program = engine.shaderAtlas.getShader(this.filter);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(this.program);
	
	J3D.ShaderUtil.setTexture(this.program, 0, "uTexture", texture);
	J3D.ShaderUtil.setAttributes(this.program, this.geometry);
    this.filter.delta = delta;
    this.filter.setup(this.program);

	gl.drawArrays(this.drawMode, 0, this.geometry.size);
}


