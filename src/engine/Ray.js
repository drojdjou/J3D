J3D.Ray = function() {
	this.origin = new v3();
	this.direction = new v3();
	
	this.localOrigin = new v3();
	this.localDirection = new v3();
}

J3D.Ray._mt = mat4.create();
J3D.Ray._nt = mat4.create();

J3D.Ray.fromMousePosition = function(mouseX, mouseY, camera) {
	var r = new J3D.Ray();
	var ra = [(mouseX / window.innerWidth) * 2 - 1, (mouseY / window.innerHeight) * 2 - 1, -1];
	var m = mat4.create();
    mat4.identity(m);

    mat4.inverse(camera.camera.projectionMat.toArray(), m);
	mat4.multiply(camera.globalMatrix, m, m);
	mat4.multiplyVec3(m, ra);
	
	r.origin.fromArray(ra);

    r.direction = r.origin.sub(camera.worldPosition).norm();

	return r;
}

J3D.Ray.prototype.makeLocal = function(t) {
    mat4.inverse(t.globalMatrix, J3D.Ray._mt);
    this.localOrigin.fromArray(mat4.multiplyVec3(J3D.Ray._mt, this.origin.xyz(), this.localOrigin.xyz()));

    mat3.toMat4(t.normalMatrix, J3D.Ray._nt);
    mat4.inverse(J3D.Ray._nt);
    this.localDirection.fromArray(mat4.multiplyVec3(J3D.Ray._nt, this.direction.xyz(), this.localDirection.xyz()));
}