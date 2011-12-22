J3D.Ray = function() {
	this.origin = new v3();
	this.direction = new v3();
	
	this.localOrigin = new v3();
	this.localDirection = new v3();
}

J3D.Ray._mt = mat4.create();
J3D.Ray._nt = mat3.create();

J3D.Ray.fromMousePosition = function(mouseX, mouseY, camera) {
    var mx = (mouseX / window.innerWidth) * 2 - 1;
    var my = (1 - mouseY / window.innerHeight) * 2 - 1;
	var ra = [mx, my, 0];

    mat4.inverse(camera.camera.projectionMat.toArray(), J3D.Ray._mt);
    mat4.multiplyVec3(J3D.Ray._mt, ra);

    mat4.multiplyVec3(camera.globalMatrix, ra);

    var r = new J3D.Ray();
    r.origin.fromArray(ra);
    r.direction = r.origin.sub(camera.worldPosition).norm();

	return r;
}

J3D.Ray.prototype.makeLocal = function(t) {
    mat4.inverse(t.globalMatrix, J3D.Ray._mt);
    this.localOrigin.fromArray(mat4.multiplyVec3(J3D.Ray._mt, this.origin.xyz()));

    mat4.toInverseMat3(t.globalMatrix, J3D.Ray._nt);
    mat3.transpose(J3D.Ray._nt);

    var d = this.direction;
    var dr = this.direction.xyz();
    var m = J3D.Ray._nt;

    dr[0] = d.x * m[0] + d.y * m[1] + d.z * m[2];
    dr[1] = d.x * m[3] + d.y * m[4] + d.z * m[5];
    dr[2] = d.x * m[6] + d.y * m[7] + d.z * m[8];

    this.localDirection.fromArray(dr);
}