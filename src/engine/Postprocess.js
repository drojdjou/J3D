/** Render to texture and postprocessing
 *  
 *  Cases:
 *  a. render to a texture
 *  a.1 needs to be rendered before anything else
 *  a.2 needs a camera where renderTarget != null
 *  
 *  b. add post process effect
 *  b.1 happens after everything, but the fbo needs to be setup first
 *  b.2 can be used with render to texture as well
 *  b.3 uses a filter collection to determine which effects (and in what order) to apply
 *  b.4 renders to texture, creates the quad and applies the effect (repeats for each effect)
 *  
 *  Alpha:
 *  Camera can have filter added
 *  If filter is present than only one is applied
 *  Renders to an FBO
 *  Uses the texture to render a full screen quad
 */

J3D.Postprocess = function(){
	this.camera = null;
	
	this.effectAtlas = new J3D.EffectAtlas();
	
	this.vbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1,     1, 1,     1, -1,     -1, 1,     1, -1,     -1, -1]), gl.STATIC_DRAW);
	
	this.tbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 1,     1, 1,     1, 0,     0, 1,     1, 0,    0, 0]), gl.STATIC_DRAW);
	
	this.active = false;
}

J3D.Postprocess.prototype.prepare = function(camera){
	this.active = camera.hasFilters();
	
	if (this.active) {
		this.program = this.effectAtlas.getEffect(camera.filter);
		gl.uniform1f(this.program.uTime, J3D.Time.time);
		camera.filter.prepare(this, this.program);
		this.camera = camera;
	}
}

J3D.Postprocess.prototype.apply = function(){
	if(!this.active) return;
	var texture = this.camera.filter.apply(this, this.program);
}

J3D.Postprocess.prototype.drawQuad = function(texture, program, fbo){
	if(fbo) fbo.bind();
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.useProgram(program);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
	gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
	gl.vertexAttribPointer(this.program.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(this.program.uTexture, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);
	
	if(fbo) fbo.unbind();
}




