J3D.Light = function(t){

	this.type = (t != null) ? t : J3D.NONE;
	this.color = J3D.Color.white;
	this.intensity = 1.0;
    this.angleFalloff = 0.0;
    this.angle = 0.0;
}

J3D.NONE = -1; // For shader internal use

J3D.AMBIENT = 0;

J3D.DIRECT = 1;
J3D.POINT = 2;
J3D.SPOTLIGHT = 3;

J3D.HEMISPHERE = 4;
J3D.SPHERICAL_HARMONICS = 5;


