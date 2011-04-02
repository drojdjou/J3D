J3D.Light = function(t){
	this.type = t || J3D.NONE;
	this.direction = v3.ZERO();
	this.color = Color.white;
}

J3D.NONE = parseInt(0); // For shader internal use
J3D.DIRECT = parseInt(1);
J3D.POINT = parseInt(2);
// J3D.SPOT = 3;