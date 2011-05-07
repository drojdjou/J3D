J3D.ShaderSource = {};

J3D.ShaderAtlas = function(){
	this.shaders = {};
	this.programs = {};
	
	this.shaderCount = 0;
}

J3D.ShaderAtlas.prototype.compileShaderSource = function(name, src, type){
	var isrc;
	
	if(type == gl.VERTEX_SHADER) {
		isrc = J3D.ShaderSource.CommonInclude + J3D.ShaderSource.VertexInclude + src;
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
	
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
 
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log("Error creating program " + name);
	}
	
	gl.useProgram(shaderProgram);
	renderer.setupLocations(shaderProgram);
	this.shaderCount++;
	
	this.shaders[name] = shaderProgram;
}

J3D.ShaderAtlas.prototype.getShader = function (renderer) {
	if(!this.shaders[renderer.name]) {
		this.compileShaderSource(renderer.name + "Vert", renderer.vertSource(), gl.VERTEX_SHADER);
		this.compileShaderSource(renderer.name + "Frag", renderer.fragSource(), gl.FRAGMENT_SHADER);
		this.linkShader(renderer);
	}
	
	return this.shaders[renderer.name];
}











