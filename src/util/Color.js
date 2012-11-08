/**
    Creates a new Color

    @class Color is used to hold information about colors that can be passed as uniforms to a shader. The color has red, green, blue and alpha channels defined in normalized values.
 */
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
	
	this.toUniform = function(type){
		if(type == gl.FLOAT_VEC3) return this.rgb();
		else return this.rgba();
	}

    this.toRGB = function() {
        var r8 = (this.r * 255) | 0;
        var g8 = (this.g * 255) | 0;
        var b8 = (this.b * 255) | 0;
        return 'rgb(' + r8 + ',' + g8 + ',' + b8 + ')';
    }
}

J3D.Color.white = new J3D.Color(1,1,1,1);
J3D.Color.black = new J3D.Color(0,0,0,1);

J3D.Color.red =   new J3D.Color(1,0,0,1);
J3D.Color.green = new J3D.Color(0,1,0,1);
J3D.Color.blue =  new J3D.Color(0,0,1,1);
