J3D.EffectAtlas = function(){
	this.shaders = {};
	this.programs = {};
	this.shaderCount = 0;
}

J3D.EffectAtlas.prototype.compileShaderSource = function(name, src, type){
	var isrc;
	
	if(type == gl.FRAGMENT_SHADER) {
		isrc = J3D.EffectSource.CommonInclude + src;
	} else {
		isrc = src;
	}
	
	var shader = gl.createShader(type);
	gl.shaderSource(shader, isrc);
    gl.compileShader(shader);
 
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log("Effect compile error: " + gl.getShaderInfoLog(shader));
    }
	
	this.programs[name] = shader;
}

J3D.EffectAtlas.prototype.linkShader = function(renderer){
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
	
	// Common uniforms and attributes for all effects
	program.uTime = gl.getUniformLocation(program, "uTime");
	
	program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	gl.enableVertexAttribArray(program.aVertexPosition);
		
	program.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
	gl.enableVertexAttribArray(program.aTextureCoord);
		
	program.uTexture = gl.getUniformLocation(program, "uTexture");

	renderer.setup(program);
	this.shaderCount++;
	
	this.shaders[name] = program;
}

J3D.EffectAtlas.prototype.getEffect = function (filter) {
	if(!this.shaders[filter.name]) {
		this.compileShaderSource(filter.name + "Vert", filter.vertSource(), gl.VERTEX_SHADER);
		this.compileShaderSource(filter.name + "Frag", filter.fragSource(), gl.FRAGMENT_SHADER);
		this.linkShader(filter);
	}
	
	return this.shaders[filter.name];
}









