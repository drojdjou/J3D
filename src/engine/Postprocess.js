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
	this.program = engine.shaderAtlas.getFilter(this.filter);
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(this.program);
	
	if(this.program.uniforms.uTime) gl.uniform1f(this.program.uniforms.uTime.location, J3D.Time.time);
	J3D.ShaderUtil.setTexture(this.program, 0, "uTexture", texture);

	for(var i = 0; i < this.geometry.arrays.length; i++) {
		var vbo = this.geometry.arrays[i];	
		if(this.program.attributes[vbo.name] != null) {
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo.buffer);
			gl.vertexAttribPointer(this.program.attributes[vbo.name], vbo.itemSize, gl.FLOAT, false, 0, 0);
		}
	}

	gl.drawArrays(this.drawMode, 0, this.geometry.size);
}


