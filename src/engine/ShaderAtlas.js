J3D.ShaderSource = {};

J3D.ShaderAtlas = function(){
	this.shaders = {};
	this.programs = {};
	
	this.shaderCount = 0;
}

J3D.ShaderAtlas.prototype.compileShaderSource = function(name, src, type){
	var isrc;
	
	if(type == gl.VERTEX_SHADER) {
		isrc = J3D.ShaderSource.VertexInclude + J3D.ShaderSource.CommonInclude + src;
	} else {
		isrc = J3D.ShaderSource.CommonInclude + src;
	}
	
	var shader = gl.createShader(type);
	gl.shaderSource(shader, isrc);
    gl.compileShader(shader);
 
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log("Shader compile error: " + gl.getShaderInfoLog(shader));
    }
	
	this.programs[name] = shader;
}

J3D.ShaderAtlas.prototype.linkShader = function(renderer){
	var name = renderer.name;
	
	var vertName = name + "Vert";
	var fragName = name + "Frag";
	
	var vertexShader = this.programs[vertName];
	var fragmentShader = this.programs[fragName];
	
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
 
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log("Error linking program " + name);
	}
	
	gl.useProgram(program);
	
	// Common uniforms and attributes for all shaders
	program.uTime = gl.getUniformLocation(program, "uTime");
	
	program.pMatrix = gl.getUniformLocation(program, "pMatrix");
	program.vMatrix = gl.getUniformLocation(program, "vMatrix");
	program.mMatrix = gl.getUniformLocation(program, "mMatrix");
	program.nMatrix = gl.getUniformLocation(program, "nMatrix");
	program.uAmbientColor = gl.getUniformLocation(program, "uAmbientColor");
	program.uEyePosition = gl.getUniformLocation(program, "uEyePosition");
	
	program.uTileOffset = gl.getUniformLocation(program, "uTileOffset");
	
	program.attributes = {};
	var numAttr = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	for(var i = 0; i < numAttr; i++) {
		var acAttr = gl.getActiveAttrib(program, i);
		program.attributes[acAttr.name] = gl.getAttribLocation(program, acAttr.name);
		gl.enableVertexAttribArray(program.attributes[acAttr.name]);
	}
	
	/*program.vertAttr = gl.getAttribLocation(program, "aVertexPosition");
	gl.enableVertexAttribArray(program.vertAttr);
	
	program.normAttr = gl.getAttribLocation(program, "aVertexNormal");
	gl.enableVertexAttribArray(program.normAttr);
	
	program.uv1Attr = gl.getAttribLocation(program, "aTextureCoord");
	gl.enableVertexAttribArray(program.uv1Attr);
	
	program.uv2Attr = gl.getAttribLocation(program, "aTextureCoord2");
	gl.enableVertexAttribArray(program.uv2Attr);

	program.colorAttr = gl.getAttribLocation(program, "aVertexColor");
	gl.enableVertexAttribArray(program.colorAttr);
	
	program.animAttr = gl.getAttribLocation(program, "aVertexAnimation");
	gl.enableVertexAttribArray(program.animAttr);*/
	
	renderer.setupLocations(program);
	this.shaderCount++;
	
	this.shaders[name] = program;
}

J3D.ShaderAtlas.prototype.getShader = function (renderer) {
	if(!this.shaders[renderer.name]) {
		this.compileShaderSource(renderer.name + "Vert", renderer.vertSource(), gl.VERTEX_SHADER);
		this.compileShaderSource(renderer.name + "Frag", renderer.fragSource(), gl.FRAGMENT_SHADER);
		this.linkShader(renderer);
	}
	
	return this.shaders[renderer.name];
}











