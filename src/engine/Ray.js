/**
    Creates a new Ray

    @class A Ray has an origin and a direction. It is for ray casting, mostly to calculate the ray from the mouse and detect 3d rollovers.

    @params o Origin of the ray

    @params d Direction of the ray
 */
J3D.Ray = function(o, d) {
	this.origin = o || new v3();
	this.direction = d || new v3();
	
	this.localOrigin = new v3();
	this.localDirection = new v3();
}

J3D.Ray._mt = mat4.create();
J3D.Ray._nt = mat3.create();

J3D.Ray.fromMousePosition = function(mouseX, mouseY, camera, canvasRect) {

    if(!canvasRect) {
        canvasRect = {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    var mx = ( (mouseX - canvasRect.x) / canvasRect.width) * 2 - 1;
    var my = (1 - (mouseY - canvasRect.y) / canvasRect.height) * 2 - 1;
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