J3D.Transform = function(){
	var that = this;
	var children = [];
	this.numChildren = 0;
	
	// All local
	this.position = v3.ZERO();
	this.rotation = v3.ZERO();
	this.scale = v3.ONE();
	
	// This gets only updated for lights
	this.worldPosition = v3.ZERO();
	
	// Local transformation matrix
	this.matrix = mat4.create();
	// World transformation matrix (concatenated local transforms of all parents and self)
	this.globalMatrix = mat4.create();
	// Normal matrix (inverse/transpose of view matrix for use with normals)
	this.normalMatrix = mat3.create();
	
	this.isStatic = false;
	this._lockedMatrix = false;
	this.enabled = true;
	
	this.renderer;	
	this.mesh;
	this.camera;
	this.light;

	this.add = function(t){
		children.push(t);
		that.numChildren = children.length;
		return t;
	}
	
	this.childAt = function(i){
		return children[i];
	}	
}

J3D.Transform.prototype.clone = function(){
	var c = new J3D.Transform();
	c.position = this.position.cp();
	c.rotation = this.rotation.cp();
	c.scale = this.scale.cp();
	
	c.isStatic = this.isStatic;
	
	c.renderer = this.renderer;
	c.mesh = this.mesh;
	c.camera = this.camera;
	c.light = this.light;
	
	return c;
}

J3D.Transform.prototype.updateWorld = function(parent){
	if(this._lockedMatrix) return;
	
	mat4.identity(this.matrix);
	
	mat4.translate(this.matrix, [this.position.x, this.position.y, this.position.z]);
	
	mat4.rotateZ(this.matrix, this.rotation.z);
	mat4.rotateX(this.matrix, this.rotation.x);
	mat4.rotateY(this.matrix, this.rotation.y);
	
	mat4.scale(this.matrix, [this.scale.x, this.scale.y, this.scale.z]);

	if(parent != null) mat4.multiply(parent.globalMatrix, this.matrix, this.globalMatrix);
	else this.globalMatrix = this.matrix;
	
	mat4.toInverseMat3(this.globalMatrix, this.normalMatrix);
	mat3.transpose(this.normalMatrix);
	
	if(this.isStatic) this._lockedMatrix = true;
}

J3D.Transform.prototype.updateWorldPosition = function(){
	var tmp = [0,0,0];	
	mat4.multiplyVec3(this.globalMatrix, tmp);
	this.worldPosition.x = tmp[0];
	this.worldPosition.y = tmp[1];
	this.worldPosition.z = tmp[2];
}







