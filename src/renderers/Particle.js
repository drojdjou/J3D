J3D.Particle = function() {
	this.name = "Particle";
	this.drawMode = gl.POINTS;
	//
	this.color = J3D.Color.white;
}

J3D.Particle.prototype.vertSource = function() {
	return J3D.ShaderSource.ParticleVertex;
}

J3D.Particle.prototype.fragSource = function() {
	return J3D.ShaderSource.ParticleFragment;
}

J3D.Particle.prototype.setupLocations = function(shader) {
	shader.uColor = gl.getUniformLocation(shader, "uColor");
}

J3D.Particle.prototype.setup = function(mesh, shader, lights, camera) {
	gl.uniform4fv(shader.uColor, this.color.rgba());	
}