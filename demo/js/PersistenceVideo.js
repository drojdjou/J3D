J3D.Persistence = function(engine) {
    this.drawMode = gl.TRIANGLES;
	this.engine = engine;

	this.blendWithA = false;

	this.fboN = new J3D.FrameBuffer();
	this.fboA = new J3D.FrameBuffer();
	this.fboB = new J3D.FrameBuffer();

	this.geometry = J3D.Primitive.FullScreenQuad();
	this.blendFilter = null;
    // Use the simplest copy filter to render the composite to the screen (can be overwritten)
	this.copyFilter = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.CopyFilter);
}

J3D.Persistence.prototype.render = function() {

    var program;

    // PREPARE. Establish which framebuffer to use for what
    var blendFbo = (this.blendWithA) ? this.fboA : this.fboB;
    var compositeFbo = (this.blendWithA) ? this.fboB : this.fboA;

    // STEP 1. Render the scene into the "new texture"
	this.fboN.bind();

    program = this.engine.shaderAtlas.getShader(this.copyFilter);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);

    J3D.ShaderUtil.setAttributes(program, this.geometry);
	J3D.ShaderUtil.setTexture(program, 0, "uTexture", this.vTexture);
    this.copyFilter.setup(program);

    if (this.geometry.renderMode == J3D.RENDER_AS_OPAQUE) {
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
    } else {
        gl.disable(gl.DEPTH_TEST);
	    gl.enable(gl.BLEND);
        var srcFactor = (this.geometry.srcFactor != null) ? this.geometry.srcFactor : gl.SRC_ALPHA;
		var dstFactor = (this.geometry.dstFactor != null) ? this.geometry.dstFactor : gl.ONE;
		gl.blendFunc(srcFactor, dstFactor);
    }

    gl.drawArrays(this.drawMode, 0, this.geometry.size);

	this.fboN.unbind();

    // STEP 2. Render the new texture and the blend from previous frame to the composite framebuffer
    compositeFbo.bind();

	program = engine.shaderAtlas.getShader(this.blendFilter);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(program);

    J3D.ShaderUtil.setAttributes(program, this.geometry);

	//J3D.ShaderUtil.setTexture(program, 0, "uNewTexture", this.fboN.texture);
	J3D.ShaderUtil.setTexture(program, 0, "uNewTexture", this.fboN.texture);

	//J3D.ShaderUtil.setTexture(program, 1, "uOldTexture", blendFbo.texture);
	J3D.ShaderUtil.setTexture(program, 1, "uOldTexture", blendFbo.texture);

    this.blendFilter.uNewTexture = this.fboN.texture;
    this.blendFilter.uOldTexture = blendFbo.texture;

    this.blendFilter.setup(program);

	gl.drawArrays(gl.TRIANGLES, 0, this.geometry.size);

	compositeFbo.unbind();

    // STEP 3. Render the composite framebuffer to screen
	var program = engine.shaderAtlas.getShader(this.copyFilter);


	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(program);

    J3D.ShaderUtil.setAttributes(program, this.geometry);
	J3D.ShaderUtil.setTexture(program, 0, "uTexture", compositeFbo.texture);
    this.copyFilter.setup(program);

	gl.drawArrays(gl.TRIANGLES, 0, this.geometry.size);

    // STEP 4. Swap framebuffers for next rendering frame
	this.blendWithA = !this.blendWithA;
}