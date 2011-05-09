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
	
	this.setClearColor(J3D.Color.black);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);	
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	
	this.shaderAtlas = new J3D.ShaderAtlas();
	this.scene = new J3D.Scene();
	this.camera;
	
	this.canvas = cv;
	
	this._opaqueMeshes = [];
	this._lights = [];
	
	this.gl = gl;
}

J3D.Engine.prototype.setClearColor = function(c) {
	gl.clearColor(c.r, c.g, c.b, c.a);
}

J3D.Engine.prototype.render = function() {
	
	J3D.Time.tick();

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
	gl.enable(gl.DEPTH_TEST);
	
	for(var i = 0; i < this._opaqueMeshes.length; i++){
		var t = this._opaqueMeshes[i];
		var s = this.shaderAtlas.getShader(t.renderer);
		
		t.updateViewAndNormal(this.camera.inverseMat);
		
		gl.useProgram(s);
		
		// Setup standard uniforms and attributes
		gl.uniformMatrix4fv(s.pMatrix, false, this.camera.projectionMat.toArray() );
		gl.uniformMatrix4fv(s.mvMatrix, false, t.viewMatrix);
		gl.uniformMatrix3fv(s.nMatrix, false, t.normalMatrix);
		
		gl.uniform3fv(s.uAmbientColor, this.scene.ambient.rgb());
		
		if (t.mesh.vertBuf) {
			gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.vertBuf);
			gl.vertexAttribPointer(s.vertAttr, t.mesh.vertSize, gl.FLOAT, false, 0, 0);
		}
	
		if (t.mesh.normBuf) {
			gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.normBuf);
			gl.vertexAttribPointer(s.normAttr, t.mesh.vertSize, gl.FLOAT, false, 0, 0);
		}
	
		if (t.mesh.uv1buf) {
			gl.bindBuffer(gl.ARRAY_BUFFER, t.mesh.uv1buf);
			gl.vertexAttribPointer(s.uv1Attr, t.mesh.uvSize, gl.FLOAT, false, 0, 0);
		}

		
		// Setup renderers custom uniforms and attributes
		t.renderer.setup(t.mesh, s, this._lights, this.camera);

		if(t.enabled) {	
			var cull = t.renderer.cullFace || gl.BACK;			
			gl.cullFace(cull);
			
			var mode = t.renderer.drawMode || gl.TRIANGLES;
			
			if (t.mesh.triBuf) {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, t.mesh.triBuf);
				gl.drawElements(mode, t.mesh.triNum, gl.UNSIGNED_SHORT, 0);
			} else {
				// TODO: Draw arrays
			}
			
		}
	}

	// 4. TODO: Sort & render transparent meshes

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
	
	if (t.light) {
		this._lights.push(t);
	}
}










