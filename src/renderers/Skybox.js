J3D.Skybox = function() {
	this.name = "Skybox";
	// Parameters
	this.cubemap;
}

J3D.Skybox.prototype.vertSource = function() {
	return J3D.ShaderSource.SkyboxVertex;
}

J3D.Skybox.prototype.fragSource = function() {
	return J3D.ShaderSource.SkyboxFragment;
}

J3D.Skybox.prototype.setupLocations = function(shader) {
	shader.cubemap = gl.getUniformLocation(shader, "uCubemap");
	shader.mid = gl.getUniformLocation(shader, "mid");
}

J3D.Skybox.prototype.setup = function(mesh, shader, lights, camera) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubemap.tex);
	gl.uniform1i(shader.cubemap, 0);
	gl.uniform1f(shader.mid, camera.near+(camera.far-camera.near)/2 );	
}