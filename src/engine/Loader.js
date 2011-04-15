J3D.Loader = {};

J3D.Loader.parseJSONScene = function(jscene, jmeshes, engine) {
	
	engine.scene.ambient = J3D.Loader.fromObject(J3D.Color, jscene.ambient);
	
	for(var ms in jscene.materials) {
		var m = jscene.materials[ms];
		m = J3D.Loader.fromObject(m.type, m);
		m.color = J3D.Loader.fromObject(J3D.Color, m.color);
		jscene.materials[ms] = m;
	}
	
	for(var lgs in jscene.lights) {
		var lg = jscene.lights[lgs];
		lg = J3D.Loader.fromObject(J3D.Light, lg);
		lg.color = J3D.Loader.fromObject(J3D.Color, lg.color);
		if(lg.direction) lg.direction = J3D.Loader.v3FromArray(lg.direction);
		jscene.lights[lgs] = lg;
	}
	
	for(var cms in jscene.cameras) {
		var cm = jscene.cameras[cms];
		cm = new J3D.Camera(cm.fov, null, cm.near, cm.far);
		jscene.cameras[cms] = cm;
		// Thus the last camera on the list wins... (TODO: make it more predictable)
		engine.camera = cm;
	}
	
	for(var ts in jscene.transforms) {
		var t = jscene.transforms[ts];
		t = J3D.Loader.fromObject(J3D.Transform, t);
		t.position = J3D.Loader.v3FromArray(t.position);
		t.rotation = J3D.Loader.v3FromArray(t.rotation);
		
		if(t.renderer) t.renderer = jscene.materials[t.renderer];
		if(t.mesh) t.mesh = new J3D.Mesh(jmeshes[t.mesh]);
		if(t.light) t.light = jscene.lights[t.light];
		
		if (t.camera) {
			jscene.cameras[t.camera].transform = t;
			t.camera = jscene.cameras[t.camera];
		}

		jscene.transforms[ts] = t;
	}
	
	for (var ts in jscene.transforms) {
		var t = jscene.transforms[ts];
		if (t.parent) {
			t.parent = jscene.transforms[t.parent];
			t.parent.add(t);
		} else {
			engine.scene.add(t);
		}
	}
}

J3D.Loader.fromObject = function(type, obj){
	var t = new type();
	for(var p in obj) t[p] = obj[p];
	return t;
}

J3D.Loader.v3FromArray = function(arr){
	return new v3(arr[0], arr[1], arr[2]);
}
