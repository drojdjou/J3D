J3D.Scene = function(){
	var that = this;
	var children = [];
	
	// Display list
	
	this.numChildren;
	
	this.add = function(t){
		children.push(t);
		t.parent = null;
		that.numChildren = children.length;
		return t;
	}
	
	this.childAt = function(i){
		return children[i];
	}

	// Scene setup
	this.ambient = J3D.Color.black;
}
