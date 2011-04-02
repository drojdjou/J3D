var Color = function(r, g, b, a){
	var that = this;
	this.r = r;// || 1;
	this.g = g;// || 1;
	this.b = b;// || 1;
	this.a = a;// || 1;
	
	this.rgba = function() {
		return [that.r, that.g, that.b, that.a];
	}
	
	this.rgb = function() {
		return [that.r, that.g, that.b];
	}
}

Color.white = new Color(1,1,1,1);
Color.black = new Color(0,0,0,1);
