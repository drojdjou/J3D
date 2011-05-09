var gl;

J3D.Engine = function() {
	this.gl;
	
	var cv;
	
	cv = document.createElement("canvas");
	cv.width = window.innerWidth;
	cv.height = window.innerHeight;
	document.body.appendChild(cv);

	try {
		gl = cv.getContext("experimental-webgl");
		gl.viewportWidth = cv.width;
		gl.viewportHeight = cv.height;
	} 
	catch (e) {
		console.log("Error initializing webgl: " + e);
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
	gl.cullFace(gl.FRONT);
	
	this.gl = gl;
	
	this.shaderAtlas = new J3D.ShaderAtlas();
	this.scene = new J3D.Scene();
	this.camera;
	
	this.canvas = cv;
	
	this._opaqueMeshes = [];
	this._lights = [];
}

J3D.Engine.prototype.render = function() {
	
	J3D.Time.tick();

	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	this._opaqueMeshes.length = 0;
	this._lights.length = 0;
	
	// 1. Update all transforms recursively
	for(var i = 0; i < this.scene.numChildren; i++) {
		this.updateTransform(this.scene.childAt(i), null);
	}
	
	// 2. Calculate camera inverse matrix
	this.camera.updateInverse();
	
	//3. Calculate global positions for all lights
	for (var i = 0; i < this._lights.length; i++) {
		var t = this._lights[i];
		t.updateWorldPosition(this.camera.inverseMat);
	}
	
	// 3. Render opaque meshes
	for(var i = 0; i < this._opaqueMeshes.length; i++){
		var t = this._opaqueMeshes[i];
		var s = this.shaderAtlas.getShader(t.renderer);
		
		t.updateViewAndNormal(this.camera.inverseMat);
		
		gl.useProgram(s);
		t.renderer.setup(t.mesh, s, this._lights, this.scene.ambient);
		
		gl.uniformMatrix4fv(s.projMat, false, this.camera.projectionMat.toArray() );
		gl.uniformMatrix4fv(s.mvMat, false, t.viewMatrix);
		gl.uniformMatrix3fv(s.nMat, false, t.normalMatrix);

		if(t.enabled) t.mesh.draw();
	}

	// 4. Sort & render transparent meshes (coming soon!)
	
	gl.enable(gl.DEPTH_TEST);
	gl.disable(gl.BLEND);
	
	// #DEBUG Monitor the amount of shaders created
	// console.log( this.shaderAtlas.shaderCount );
	
	
}

J3D.Engine.prototype.updateTransform = function(t, p){
	t.updateWorld(p);
	
	for (var j = 0; j < t.numChildren; j++) {
		this.updateTransform(t.childAt(j), t);
	}
	
	if(!t.enabled) return;
	
	if (t.renderer && t.mesh) {
		this._opaqueMeshes.push(t);
	}
	
	if (t.light ) {
		this._lights.push(t);
	}
}










