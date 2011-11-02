J3D.Light = function(t){
	this.type = (t != null) ? t : J3D.NONE;
	this.direction = v3.ZERO();
	this.color = J3D.Color.black;
	this.intensity = 1.0;
}

J3D.NONE = parseInt(-1); // For shader internal use
J3D.AMBIENT = parseInt(0);
J3D.DIRECT = parseInt(1);
J3D.POINT = parseInt(2);
J3D.HEMISPHERE = parseInt(3);
J3D.SPHERICAL_HARMONICS = parseInt(4);
