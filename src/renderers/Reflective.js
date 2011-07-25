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

J3D.Reflective.prototype.setup = function(mesh, shader, lights, camera) {
	J3D.ShaderUtil.setTextureCube(shader, 0, "uCubemap", this.cubemap.tex);
}