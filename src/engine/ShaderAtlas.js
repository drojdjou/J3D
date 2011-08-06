J3D.ShaderAtlas = function(){
	this.shaders = {};
	this.programs = {};
	this.shaderCount = 0;
}

J3D.ShaderAtlas.prototype.compileShaderSource = function(name, src, type, isFilter){
	var isrc;
	
	if(!isFilter) {
		if (type == gl.VERTEX_SHADER) {
			isrc = J3D.ShaderSource.VertexInclude + J3D.ShaderSource.CommonInclude + src;
		}
		else {
			isrc = J3D.ShaderSource.CommonInclude + src;
		}
	} else {	
		if (type == gl.FRAGMENT_SHADER) {
			isrc = J3D.ShaderSource.CommonFilterInclude + src;
		}
		else {
			isrc = src;
		}
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
	
	program.uniforms = {};
	program.uniformTypes = {};
	var numUni = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	for(var i = 0; i < numUni; i++) {
		var acUni = gl.getActiveUniform(program, i);
		program.uniforms[acUni.name] = gl.getUniformLocation(program, acUni.name);
		program.uniformTypes[acUni.name] = acUni.type;
	}
	
	program.attributes = {};
	var numAttr = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	for(var i = 0; i < numAttr; i++) {
		var acAttr = gl.getActiveAttrib(program, i);
		program.attributes[acAttr.name] = gl.getAttribLocation(program, acAttr.name);
		gl.enableVertexAttribArray(program.attributes[acAttr.name]);
	}

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

J3D.ShaderAtlas.prototype.getFilter = function (renderer) {
	if(!this.shaders[renderer.name]) {
		this.compileShaderSource(renderer.name + "Vert", renderer.vertSource(), gl.VERTEX_SHADER, true);
		this.compileShaderSource(renderer.name + "Frag", renderer.fragSource(), gl.FRAGMENT_SHADER, true);
		this.linkShader(renderer);
	}
	
	return this.shaders[renderer.name];
}











