var gl;

J3D.Engine = function(webglSettings) {	
	var cv;
	var resolution = 1;
	
	cv = document.createElement("canvas");
	cv.width = window.innerWidth / resolution;
	cv.height = window.innerHeight / resolution;
	cv.style.width = "100%";
	cv.style.height = "100%";
	document.body.appendChild(cv);

	try {
		gl = cv.getContext("experimental-webgl", webglSettings);
		gl.viewportWidth = cv.width;
		gl.viewportHeight = cv.height;
	} 
	catch (e) {
		console.log("Error initializing webgl: " + e);
	}
	
	this.setClearColor(J3D.Color.black);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);	
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CW);
	
	this.shaderAtlas = new J3D.ShaderAtlas();
	this.effectAtlas = new J3D.EffectAtlas();
	this.scene = new J3D.Scene();
	this.camera;
	
	this.canvas = cv;
	
	this._opaqueMeshes = [];
	this._transparentMeshes = [];
	this._lights = [];
	
	this.gl = gl;
	
	this.postprocess = new J3D.Postprocess();
}

J3D.Engine.prototype.setClearColor = function(c) {
	gl.clearColor(c.r, c.g, c.b, c.a);
}

J3D.Engine.prototype.render = function(){
	J3D.Time.tick();
	
	// 1. Setup post-processing effect(s) - if any
	this.postprocess.prepare(this.camera);
	
	// 2. Clear buffers on screen or in current FBO
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// 3-9
	if(this.scene.numChildren > 0) this.renderScene();

	// 10. Apply post-processing effect(s) - if any
	this.postprocess.apply();
}

J3D.Engine.prototype.renderScene = function(){

	

	// 3. Clear collecions
	this._opaqueMeshes.length = 0;
	this._transparentMeshes.length = 0;
	this._lights.length = 0;

	// 4. Update all transforms recursively
	for(var i = 0; i < this.scene.numChildren; i++) {
		this.updateTransform(this.scene.childAt(i), null);
	}
	
	// 5. Calculate camera inverse matrix and it's world position
	this.camera.update();
	
	// 6. Render sky box (if any)
	if(this.scene.skybox) {
		gl.depthMask(false);
		this.renderObject(this.scene.skybox);
		gl.depthMask(true);	
	}
	
	// 7. Calculate global positions for all lights
	for (var i = 0; i < this._lights.length; i++) {
		var t = this._lights[i];
		t.updateWorldPosition();
	}

	// 8. Render opaque meshes
	gl.disable(gl.BLEND);
	gl.enable(gl.DEPTH_TEST);
	for(var i = 0; i < this._opaqueMeshes.length; i++){
		this.renderObject(this._opaqueMeshes[i]);
	}

	// 9. Render transparent meshes	(TODO: sort before rendering)
	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	for(var i = 0; i < this._transparentMeshes.length; i++) {
		var t = this._transparentMeshes[i];
		var srcFactor = (t.mesh.srcFactor != null) ? t.mesh.srcFactor : gl.SRC_ALPHA;
		var dstFactor = (t.mesh.dstFactor != null) ? t.mesh.dstFactor : gl.ONE;
		gl.blendFunc(srcFactor, dstFactor);
		this.renderObject(t);
	}

	// #DEBUG Monitor the amount of shaders created
	// console.log( this.shaderAtlas.shaderCount );

	gl.flush();
}

J3D.Engine.prototype.renderObject = function(t) {
	var s = this.shaderAtlas.getShader(t.renderer);

	gl.useProgram(s);
	
	// Setup standard uniforms and attributes
	gl.uniform1f(s.uTime, J3D.Time.time);
	
	gl.uniformMatrix4fv(s.pMatrix, false, this.camera.projectionMat.toArray() );
	gl.uniformMatrix4fv(s.vMatrix, false, this.camera.inverseMat);
	gl.uniformMatrix4fv(s.mMatrix, false, t.globalMatrix);
	gl.uniformMatrix3fv(s.nMatrix, false, t.normalMatrix);
	
	gl.uniform3fv(s.uAmbientColor, this.scene.ambient.rgb());
	gl.uniform3fv(s.uEyePosition, this.camera.transform.worldPosition.xyz());
	
	gl.uniform4fv(s.uTileOffset, t.getTileOffset());
	
	if (t.mesh.vertBuf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.vertBuf);
		gl.vertexAttribPointer(s.vertAttr, t.mesh.vertSize, gl.FLOAT, false, 0, 0);
	}
	
	if (t.mesh.colorBuf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.colorBuf);
		gl.vertexAttribPointer(s.colorAttr, t.mesh.colorSize, gl.FLOAT, false, 0, 0);
	}

	if (t.mesh.normBuf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.normBuf);
		gl.vertexAttribPointer(s.normAttr, t.mesh.vertSize, gl.FLOAT, false, 0, 0);
	}

	if (t.mesh.uv1buf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.uv1buf);
		gl.vertexAttribPointer(s.uv1Attr, t.mesh.uvSize, gl.FLOAT, false, 0, 0);
	}
	
	if (t.mesh.uv2buf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.uv2buf);
		gl.vertexAttribPointer(s.uv2Attr, t.mesh.uvSize, gl.FLOAT, false, 0, 0);
	}
	
	if (t.mesh.animBuf) {
		gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.animBuf);
		gl.vertexAttribPointer(s.animAttr, t.mesh.animSize, gl.FLOAT, false, 0, 0);
	}

	
	// Setup renderers custom uniforms and attributes
	t.renderer.setup(t.mesh, s, this._lights, this.camera, t);

	var cull = t.renderer.cullFace || gl.BACK;			
	gl.cullFace(cull);
	
	var mode = (t.renderer.drawMode != null) ? t.renderer.drawMode : gl.TRIANGLES;
	
	if (t.mesh.hasElements) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, t.mesh.triBuf);
		gl.drawElements(mode, t.mesh.triNum, gl.UNSIGNED_SHORT, 0);
	} else {
		gl.drawArrays(mode, 0, t.mesh.vertNum);
	}
}

J3D.Engine.prototype.updateTransform = function(t, p){
	t.updateWorld(p);
	
	for (var j = 0; j < t.numChildren; j++) {
		this.updateTransform(t.childAt(j), t);
	}
	
	if(!t.enabled) return;
	
	if (t.renderer && t.mesh) {	
		if(t.mesh.renderMode == J3D.RENDER_AS_TRANSPARENT) 
			this._transparentMeshes.push(t);	
		else 
			this._opaqueMeshes.push(t);
	}
	
	if (t.light) {
		this._lights.push(t);
	}
}










