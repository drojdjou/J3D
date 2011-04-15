J3D.Camera = function(fov, aspect, near, far){
	
	var n = near || 1;
	var f = far || 1000;
	var a = aspect || gl.viewportWidth / gl.viewportHeight;
	
	//console.log(fov + " : " + n + " : " + f + " : " + a);
	
	this.projectionMat = new m44();
	this.projectionMat.perspective(fov, a, n, f);
	
	this.inverseMat = mat4.create();
	
	this.transform = new J3D.Transform();
}

J3D.Camera.prototype.updateInverse = function(){
	mat4.inverse(this.transform.globalMatrix, this.inverseMat);
}
