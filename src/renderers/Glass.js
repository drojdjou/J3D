J3D.Glass = function() {
	this.name = "Glass";
	// Parameters
	this.cubemap;
}

J3D.Glass.prototype.vertSource = function() {
	return J3D.ShaderSource.GlassVertex;
}

J3D.Glass.prototype.fragSource = function() {
	return J3D.ShaderSource.GlassFragment;
}

J3D.Glass.prototype.setupLocations = function(shader) {
	shader.cubemap = gl.getUniformLocation(shader, "uCubemap");
}

J3D.Glass.prototype.setup = function(mesh, shader, lights, camera) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubemap.tex);
	gl.uniform1i(shader.cubemap, 0);	
}