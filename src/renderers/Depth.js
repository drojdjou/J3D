J3D.Depth = function() {
	this.name = "Depth";
}

J3D.Depth.prototype.vertSource = function() {
	return J3D.ShaderSource.DepthVertex;
}

J3D.Depth.prototype.fragSource = function() {
	return J3D.ShaderSource.DepthFragment;
}

J3D.Depth.prototype.setupLocations = function(shader) {
}

J3D.Depth.prototype.setup = function(mesh, shader, lights, camera){	
}