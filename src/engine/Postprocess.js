/**
 * var engine = new Engine;
 * 
 * var scene = new Scene;
 * scene.camera = new Camera;
 * 
 * var postprocess = new Postprocess;
 * [postprocess.fbo = new Framebuffer;]
 * postprocess.filter = new Filter;
 * [postprocess.geometry = new Geometry;]
 * 
 * engine.renderScene(scene, [post.fbo], [scene.camera]);
 * [engine.renderFilter(postprocess, [post2.fbo2]);]
 * 
 * 
 * var effect = new Effect
 * effect.render()
 * 
 */

J3D.Postprocess = function(){ // (vr, hr)
	this.camera = null;
	this.drawMode = gl.TRIANGLES;
	
	//var vertRes = (vr) ? vr : 1;
	//var horRes = (hr) ? hr : 1;
	//this.plane = J3D.Primitives.Plane(vertRes, horRes);
	
	this.effectAtlas = new J3D.EffectAtlas();
	
	this.vbuffer = gl.createBuffer();
	this.vbuffer.itemSize = 2;
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
	var vs = new Float32Array([-1, 1,     1, 1,     1, -1,     -1, 1,     1, -1,     -1, -1]);
	this.vbuffer.length = vs.length;
	gl.bufferData(gl.ARRAY_BUFFER, vs, gl.STATIC_DRAW);
	
	this.tbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
	var uvs = new Float32Array([0, 1,     1, 1,     1, 0,     0, 1,     1, 0,    0, 0]);
	gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
	
	this.mainBuffer = this.vbuffer;
	this.overwriteBuffers = false;
	this.customBuffers = [];
	
	this.active = false;
}

J3D.Postprocess.prototype.addCustomAttribute = function(name, data, itemSize, overwrite) {
	var cbuffer = gl.createBuffer();
	cbuffer.itemSize = itemSize;
	cbuffer.name = name;
	cbuffer.length = data.length;
	gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	this.customBuffers.push(cbuffer);
	
	this.overwriteBuffers = (overwrite) ? true : false;
	if(this.overwriteBuffers) this.mainBuffer = cbuffer;
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
	
	if (!this.overwriteBuffers) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuffer);
		gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuffer);
		gl.vertexAttribPointer(this.program.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
	}
	
	for(var i in this.customBuffers) {
		var cb = this.customBuffers[i];
		gl.bindBuffer(gl.ARRAY_BUFFER, cb);
		gl.vertexAttribPointer(this.program[cb.name], cb.itemSize, gl.FLOAT, false, 0, 0);
	}

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(this.program.uTexture, 0);

	gl.drawArrays(this.drawMode, 0, this.mainBuffer.length / this.mainBuffer.itemSize);
	
	if(fbo) fbo.unbind();
}




