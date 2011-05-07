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
	shader.vertAttr = gl.getAttribLocation(shader, "aVertexPosition");
	gl.enableVertexAttribArray(shader.vertAttr);
	
	shader.normAttr = gl.getAttribLocation(shader, "aVertexNormal");
	gl.enableVertexAttribArray(shader.normAttr);

	shader.projMat = gl.getUniformLocation(shader, "projMat");
	shader.mvMat = gl.getUniformLocation(shader, "uMVMatrix");
	shader.nMat = gl.getUniformLocation(shader, "uNMatrix");
}

J3D.Normal2Color.prototype.setup = function(mesh, shader, lights, ambient){	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertBuf);
	gl.vertexAttribPointer(shader.vertAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normBuf);
	gl.vertexAttribPointer(shader.normAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.triBuf);
}