J3D.Reflective = function() {
	this.name = "Reflective";
	// Parameters
	this.cubemap;
}

J3D.Reflective.prototype.vertSource = function() {
	return J3D.ShaderSource.ReflectiveVertex;
}

J3D.Reflective.prototype.fragSource = function() {
	return J3D.ShaderSource.ReflectiveFragment;
}

J3D.Reflective.prototype.setupLocations = function(shader) {
	shader.cubemap = gl.getUniformLocation(shader, "uCubemap");
}

J3D.Reflective.prototype.setup = function(mesh, shader, lights, camera) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubemap.tex);
	gl.uniform1i(shader.cubemap, 0);	
}