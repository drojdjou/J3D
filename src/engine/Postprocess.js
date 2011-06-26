J3D.Postprocess = function(filter){
	this.filterSet = false;
}

J3D.Postprocess.prototype.setFilter = function(filter){	
	if(this.filterSet) return; 

	var vs = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vs, filter.vertSource());
	gl.compileShader(vs);
				
	var fs = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fs, filter.fragSource());
	gl.compileShader(fs);

	var program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
				
	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) 
		console.log(gl.getShaderInfoLog(vs));
					
	if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) 
		console.log(gl.getShaderInfoLog(fs));
	
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
		console.log(gl.getProgramInfoLog(program));
	
	vbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);			
	var vertices = new Float32Array([-1,1,	1,1,	1,-1,	-1,1,   1,-1,   -1,-1]);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	tbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, tbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,  1,0,  1,1,  0,0,  1,1,  0,1]), gl.STATIC_DRAW);
	
	gl.useProgram(this.program);
	
	program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	gl.enableVertexAttribArray(program.aVertexPosition);
	
	program.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
	gl.enableVertexAttribArray(program.aTextureCoord);

	program.uTexture = gl.getUniformLocation(program, "uTexture");
	
	this.program = program;
	
	// Create FBO
	this.fbo;
	this.rbo;
	this.tex;
	
	this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
	
	this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	this.rbo = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight);
	
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.rbo);

	gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	this.filterSet = true;
}

J3D.Postprocess.prototype.bindFBO = function(texture){
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
}

J3D.Postprocess.prototype.releaseFBO = function(texture){
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

J3D.Postprocess.prototype.renderToScreen = function(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.useProgram(this.program);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
	gl.vertexAttribPointer(this.program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, tbuffer);
	gl.vertexAttribPointer(this.program.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.tex);
	gl.uniform1i(this.program.uTexture, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);
}
