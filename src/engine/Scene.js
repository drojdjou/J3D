J3D.Scene = function() {
	var that = this;
	var children = [];
	
	this.ambient = J3D.Color.black;
	this.numChildren;
	this.skybox;
	
	this.add = function() {
		var firstAdded;
		for (var i = 0; i < arguments.length; i++) {
			var t = arguments[i];
			children.push(t);
			t.parent = null;
			that.numChildren = children.length;
			if(i == 0) firstAdded = t;
		}
		return firstAdded;
	}
	
	this.childAt = function(i){
		return children[i];
	}

	// TODO: Get rid of the mesh and create the geometry proceduraly
	this.addSkybox = function(cubemap, mesh) {
		this.skybox = new J3D.Transform();
		this.skybox.renderer = new J3D.Skybox();
		this.skybox.renderer.cubemap = cubemap;
		this.skybox.mesh = mesh;
	}
}
