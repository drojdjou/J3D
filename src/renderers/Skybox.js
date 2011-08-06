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

J3D.Skybox.prototype.setup = function(mesh, shader, camera) {
	J3D.ShaderUtil.setTextureCube(shader, 0, "cubemap", this.cubemap.tex);
	gl.uniform1f(shader.uniforms.mid, camera.near+(camera.far-camera.near)/2 );	
}