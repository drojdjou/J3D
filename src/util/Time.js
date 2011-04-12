J3D.Time = {}

J3D.Time.time = 0;
J3D.Time.deltaTime = 0;

J3D.Time.tick = function() {
	var tn = new Date().getTime();
    if (J3D.Time.time != 0) J3D.Time.deltaTime = tn - J3D.Time.time;
    J3D.Time.time = tn;
};


