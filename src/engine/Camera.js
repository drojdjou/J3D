J3D.Camera = function(fov, aspect, near, far){
	
	this.projectionMat = new m44();
	this.projectionMat.perspective(fov, aspect, near, far);
	
	this.inverseMat = mat4.create();
	
	this.transform;
}

J3D.Camera.prototype.updateInverse = function(){
	mat4.inverse(this.transform.globalMatrix, this.inverseMat);
}

J3D.Camera.create = function(fov, near, far){
	var t = new J3D.Transform();
	var c = new J3D.Camera(fov, gl.viewportWidth / gl.viewportHeight, near, far);
	t.camera = c;
	c.transform = t;
	return c;
}
