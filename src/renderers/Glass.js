J3D.Glass = function() {
	this.name = "Glass";
	// Parameters
	this.cubemap;	
	this.chromaticDispertion = v3.ONE();
	this.bias = 1;
	this.scale = 1;
	this.power = 1;
}

J3D.Glass.prototype.vertSource = function() {
	return J3D.ShaderSource.GlassVertex;
}

J3D.Glass.prototype.fragSource = function() {
	return J3D.ShaderSource.GlassFragment;
}

J3D.Glass.prototype.setupLocations = function(shader) {
	shader.cubemap = gl.getUniformLocation(shader, "uCubemap");
	
	shader.chromaticDispertion = gl.getUniformLocation(shader, "chromaticDispertion");
	shader.bias = gl.getUniformLocation(shader, "bias");
	shader.scale = gl.getUniformLocation(shader, "scale");
	shader.power = gl.getUniformLocation(shader, "power");
}

J3D.Glass.prototype.setup = function(mesh, shader, lights, camera) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubemap.tex);
	gl.uniform1i(shader.cubemap, 0);	
	
	gl.uniform3fv(shader.chromaticDispertion, this.chromaticDispertion.xyz());	
	gl.uniform1f(shader.bias, this.bias);	
	gl.uniform1f(shader.scale, this.scale);	
	gl.uniform1f(shader.power, this.power);	
}