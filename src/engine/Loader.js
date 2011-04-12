J3D.Loader = {};

J3D.Loader.parseJSONScene = function(jscene, jmeshes, scn) {
	
	for(var ms in jscene.materials) {
		var m = jscene.materials[ms];
		m = J3D.Loader.fromObject(m.type, m);
		m.color = J3D.Loader.fromObject(J3D.Color, m.color);
		jscene.materials[ms] = m;
	}
	
	for(var ts in jscene.transforms) {
		var t = jscene.transforms[ts];
		t = J3D.Loader.fromObject(J3D.Transform, t);
		t.position = J3D.Loader.fromObject(v3, t.postion);
		t.rotation = J3D.Loader.fromObject(v3, t.rotation);
		
		if(t.renderer) t.renderer = jscene.materials[t.renderer];
		
		if(t.mesh) t.mesh = new J3D.Mesh(jmeshes[t.mesh]);
		
		jscene.transforms[ts] = t;
	}
	
	for (var ts in jscene.transforms) {
		var t = jscene.transforms[ts];
		if (t.parent) {
			t.parent = jscene.transforms[t.parent];
			t.parent.add(t);
		} else {
			scn.add(t);
		}
	}
}

J3D.Loader.fromObject = function(type, obj){
	var t = new type();
	for(var p in obj) t[p] = obj[p];
	return t;
}
