var gl;

J3D.Engine = function(canvas, j3dSettings, webglSettings) {
    var that = this;

	var cv = (canvas) ? canvas : document.createElement("canvas");
	
	if (!canvas) {
		var resolution = (j3dSettings && j3dSettings.resolution) ? j3dSettings.resolution : 1;
		cv.width = window.innerWidth / resolution;
		cv.height = window.innerHeight / resolution;
		cv.style.width = "100%";
		cv.style.height = "100%";
		document.body.appendChild(cv);
    }

	try {
		gl = cv.getContext("experimental-webgl", webglSettings);
		gl.viewportWidth = cv.width;
		gl.viewportHeight = cv.height;
	} 
	catch (e) {
		j3dlog("ERROR. Getting webgl context failed!");
		return;
	}
	
	this.setClearColor(J3D.Color.black);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);	
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CW);

	this.shaderAtlas = new J3D.ShaderAtlas();
	this.scene = new J3D.Scene();
	this.camera; // it is a J3D.Transform
	
	this.outCanvas = cv;
	
	this._opaqueMeshes = [];
	this._transparentMeshes = [];
	this._lights = [];
	
	this.gl = gl;
}

J3D.Engine.prototype.setClearColor = function(c) {
	gl.clearColor(c.r, c.g, c.b, c.a);
}

J3D.Engine.prototype.render = function(){
	J3D.Time.tick();
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	if(this.scene.numChildren > 0) this.renderScene();
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
	this.camera.updateInverseMat();
	
	// 6. Render sky box (if any)
	if(this.scene.skybox) {
		gl.depthMask(false);
		this.scene.skybox.renderer.mid = this.camera.camera.near + (this.camera.camera.far-this.camera.camera.near)/2;	
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
		var srcFactor = (t.geometry.srcFactor != null) ? t.geometry.srcFactor : gl.SRC_ALPHA;
		var dstFactor = (t.geometry.dstFactor != null) ? t.geometry.dstFactor : gl.ONE;
		gl.blendFunc(srcFactor, dstFactor);
		this.renderObject(t);
	}

	// #DEBUG Monitor the amount of shaders created
	// j3dlog( this.shaderAtlas.shaderCount );

	// gl.flush();
}

J3D.Engine.prototype.renderObject = function(t) {
    var s = this.shaderAtlas.getShader(t.renderer);

	gl.useProgram(s);

	// Setup standard uniforms and attributes
	if(s.uniforms.pMatrix)
		gl.uniformMatrix4fv(s.uniforms.pMatrix.location, false, this.camera.camera.projectionMat.toArray() );
		
	if(s.uniforms.vMatrix) 	
		gl.uniformMatrix4fv(s.uniforms.vMatrix.location, false, this.camera.inverseMat);
		
	if(s.uniforms.mMatrix) 
		gl.uniformMatrix4fv(s.uniforms.mMatrix.location, false, t.globalMatrix);
		
	if(s.uniforms.nMatrix) 
		gl.uniformMatrix3fv(s.uniforms.nMatrix.location, false, t.normalMatrix);

	if(s.uniforms.uEyePosition) 
		gl.uniform3fv(s.uniforms.uEyePosition.location, this.camera.worldPosition.xyz());
			
	if(s.uniforms.uTileOffset) 
		gl.uniform4fv(s.uniforms.uTileOffset.location, t.getTileOffset());


	J3D.ShaderUtil.setLights(s, this._lights);

    J3D.ShaderUtil.setAttributes(s, t.geometry);

	// Setup renderers custom uniforms and attributes
	t.renderer.setup(s, t);

	var cull = t.renderer.cullFace || gl.BACK;			
	gl.cullFace(cull);
	
	var mode = (t.renderer.drawMode != null) ? t.renderer.drawMode : gl.TRIANGLES;

	if (t.geometry.hasElements) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, t.geometry.elements.buffer);
		gl.drawElements(mode, t.geometry.elements.size, gl.UNSIGNED_SHORT, 0);
	} else {
		gl.drawArrays(mode, 0, t.geometry.size);
	}
}

J3D.Engine.prototype.updateTransform = function(t, p){
	t.updateWorld(p);
	
	for (var j = 0; j < t.numChildren; j++) {
		this.updateTransform(t.childAt(j), t);
	}
	
	if(!t.enabled) return;
	
	if (t.renderer && t.geometry) {	
		if(t.geometry.renderMode == J3D.RENDER_AS_TRANSPARENT) 
			this._transparentMeshes.push(t);	
		else 
			this._opaqueMeshes.push(t);
	}
	
	if (t.light) {
		this._lights.push(t);
	}
}










