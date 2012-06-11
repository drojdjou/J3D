/**
    Creates a new ShaderAtals

    @class ShaderAtlas holds all the shaders used in the engine. An instance of this class is created by the {@link J3D.Engine} class.
 */
J3D.ShaderAtlas = function(){
	this.shaders = {};
	this.programs = {};
	this.shaderCount = 0;
}

J3D.ShaderAtlas.prototype.compileShaderSource = function(name, src, type, meta){
	var isrc;
	
	var ci = "";
	if(meta.includes && meta.includes.length > 0) {
		for(var i = 0; i < meta.includes.length; i++) {
			ci += J3D.ShaderSource[meta.includes[i]];
		}
	}

    ci += meta.common || "";
	
	if (type == gl.VERTEX_SHADER) {
		var vi = "";
		if(meta.vertexIncludes && meta.vertexIncludes.length > 0) {
			for(var i = 0; i < meta.vertexIncludes.length; i++) {
				vi += J3D.ShaderSource[meta.vertexIncludes[i]];
			}
		}
		isrc = ci + vi + src;
	} else {
		var fi = "";
		if(meta.fragmentIncludes && meta.fragmentIncludes.length > 0) {
			for(var i = 0; i < meta.fragmentIncludes.length; i++) {
				fi += J3D.ShaderSource[meta.fragmentIncludes[i]];
			}
		}
		isrc = ci + fi + src;
	}	
	
	var shader = gl.createShader(type);
	gl.shaderSource(shader, isrc);
    gl.compileShader(shader);
 
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw J3D.Error.SHADER_COMPILE_ERROR + gl.getShaderInfoLog(shader);
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
	
	var tid = 0;
	program.uniforms = {};
	var numUni = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for(var i = 0; i < numUni; i++) {
		var acUni = gl.getActiveUniform(program, i);
		program.uniforms[acUni.name] = acUni;
		program.uniforms[acUni.name].location = gl.getUniformLocation(program, acUni.name);
		if (J3D.ShaderUtil.isTexture(acUni.type)) {
            program.uniforms[acUni.name].texid = tid;
			tid++;
		}
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

J3D.ShaderAtlas.prototype.getShader = function (r) {
	if(!this.shaders[r.name]) {
		this.compileShaderSource(r.name + "Vert", r.vertSource(), gl.VERTEX_SHADER, r.metaData);
		this.compileShaderSource(r.name + "Frag", r.fragSource(), gl.FRAGMENT_SHADER, r.metaData);
		this.linkShader(r);
	}
	
	return this.shaders[r.name];
}











