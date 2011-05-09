J3D.Camera = function(fov, aspect, near, far){
	
	this.near = near || 1;
	this.far = far || 1000;
	var a = aspect || gl.viewportWidth / gl.viewportHeight;
	
	//console.log(fov + " : " + n + " : " + f + " : " + a);
	
	this.projectionMat = new m44();
	this.projectionMat.perspective(fov, a, this.near, this.far);
	
	this.inverseMat = mat4.create();
	
	this.transform = new J3D.Transform();
}

J3D.Camera.prototype.updateInverse = function(){
	mat4.inverse(this.transform.globalMatrix, this.inverseMat);
}
