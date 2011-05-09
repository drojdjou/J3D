J3D.Skybox = function() {
	this.name = "Skybox";
	// Parameters
	this.cubemap;
	this.skybox = false;
}

J3D.Skybox.prototype.vertSource = function() {
	return J3D.ShaderSource.SkyboxVertex;
}

J3D.Skybox.prototype.fragSource = function() {
	return J3D.ShaderSource.SkyboxFragment;
}

J3D.Skybox.prototype.setupLocations = function(shader) {
	shader.cubemap = gl.getUniformLocation(shader, "uCubemap");
	shader.cameraPosition = gl.getUniformLocation(shader, "uCameraPosition");
}

J3D.Skybox.prototype.setup = function(mesh, shader, lights, camera) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubemap.tex);
	gl.uniform1i(shader.cubemap, 0);
	
	var cameraData = [0,0,0];
	mat4.multiplyVec3(camera.transform.globalMatrix, cameraData);
	cameraData.push(camera.far/2);
	
	gl.uniform4fv(shader.cameraPosition, cameraData);	
}