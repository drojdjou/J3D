j3dlogIds = {};

function j3dlog(m){
	if(J3D.debug) console.log(m);
}

function j3dlogOnce(m){
	if(J3D.debug && j3dlogIds[m] == null) console.log(m);
	j3dlogIds[m] = true;
}
