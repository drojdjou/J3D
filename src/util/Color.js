J3D.Color = function(r, g, b, a){
	var that = this;
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.a = a || 0;
	
	this.rgba = function() {
		return [that.r, that.g, that.b, that.a];
	}
	
	this.rgb = function() {
		return [that.r, that.g, that.b];
	}
}

J3D.Color.white = new J3D.Color(1,1,1,1);
J3D.Color.black = new J3D.Color(0,0,0,1);
