J3D.Time = {}

J3D.Time.time = 0;
J3D.Time.startTime = 0;
J3D.Time.timeOffset = 0;
J3D.Time.lastTime = 0;
J3D.Time.deltaTime = 0;

J3D.Time.tick = function() {
	var tn = new Date().getTime();
	
	if (J3D.Time.startTime == 0) J3D.Time.startTime = tn;
    if (J3D.Time.lastTime != 0) J3D.Time.deltaTime = tn - J3D.Time.lastTime;
	
    J3D.Time.lastTime = tn;
	J3D.Time.time = (tn - (J3D.Time.startTime)) / 1000.0;
};

J3D.Time.getTime = function() {
    J3D.Time.tick();
    return J3D.Time.deltaTime;
}

J3D.Time.pause = function() {
    J3D.Time.timeOffset = new Date().getTime();
}

J3D.Time.resume = function() {
    J3D.Time.startTime += new Date().getTime() - J3D.Time.timeOffset;
    J3D.Time.lastTime = J3D.Time.deltaTime = 0;
}

J3D.Time.formatTime = function(t, useMillis) {

    if(!t) t = J3D.Time.time;

	var mil = Math.floor((t % 1) * 100);
	var sec = Math.floor(t) % 60;
	var min = Math.floor(t / 60);
	
	if(mil < 10) mil = "0" + mil;
	if(mil == 100) mil = "00";
	
	if(sec < 10) sec = "0" + sec;
	if(min < 10) min = "0" + min;

	if(useMillis) return min + ":" + sec + ":" + mil;
    else return min + ":" + sec;
}
