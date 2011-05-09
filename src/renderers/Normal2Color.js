J3D.Normal2Color = function() {
	this.name = "Normal2Color";
}

J3D.Normal2Color.prototype.vertSource = function() {
	return J3D.ShaderSource.Normal2ColorVertex;
}

J3D.Normal2Color.prototype.fragSource = function() {
	return J3D.ShaderSource.Normal2ColorFragment;
}

J3D.Normal2Color.prototype.setupLocations = function(shader) {
}

J3D.Normal2Color.prototype.setup = function(mesh, shader, lights, camera){	
}