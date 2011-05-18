J3D.Time = {}

J3D.Time.time = 0;
J3D.Time.startTime = 0;
J3D.Time.lastTime = 0;
J3D.Time.deltaTime = 0;

J3D.Time.tick = function() {
	var tn = new Date().getTime();
	
	if (J3D.Time.startTime == 0) J3D.Time.startTime = tn;
    if (J3D.Time.lastTime != 0) J3D.Time.deltaTime = tn - J3D.Time.lastTime;
	
    J3D.Time.lastTime = tn;
	J3D.Time.time = (tn - J3D.Time.startTime) / 1000.0;
};


