J3D.Loader = {};

J3D.Loader.loadJSON = function(path, onLoadedFunc){

	var request = new XMLHttpRequest();
	request.open("GET", path);
	
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			onLoadedFunc.call(null, JSON.parse(request.responseText));
		}
	}
	
	request.send();
}

J3D.Loader.parseJSONScene = function(jscene, jmeshes, engine) {
	
	var ambient = new J3D.Transform();
	ambient.light = new J3D.Light(J3D.AMBIENT);
	ambient.light.color = J3D.Loader.fromObject(J3D.Color, jscene.ambient);
	engine.scene.add(ambient);

    for(var i in jmeshes) {
        jmeshes[i] = new J3D.Mesh(jmeshes[i]);
    }
	
	engine.setClearColor( J3D.Loader.fromObject(J3D.Color, jscene.background) );
	
	for(var txs in jscene.textures) {
		var tx = new J3D.Texture( jscene.path + jscene.textures[txs].file );
		jscene.textures[txs] = tx;
	}

    if(jscene.lightmaps) {
        J3D.LightmapAtlas = [];
        for(var i = 0; i < jscene.lightmaps.length; i++) {
            var tx = new J3D.Texture( jscene.path + jscene.lightmaps[i] );
            J3D.LightmapAtlas.push(tx);
        }
    }
	
	for(var ms in jscene.materials) {
		var m = jscene.materials[ms];
		m = J3D.Loader.fetchShader(m.type, m);
		m.color = J3D.Loader.fromObject(J3D.Color, m.color);
		if(m.textureTile) m.textureTile = J3D.Loader.v2FromArray(m.textureTile);
		if(m.textureOffset) m.textureOffset = J3D.Loader.v2FromArray(m.textureOffset);
		
		if (m.colorTexture) {
			m.colorTexture = jscene.textures[m.colorTexture];
			m.hasColorTexture = true;
		}
		
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
		cm = new J3D.Camera({fov:cm.fov, near:cm.near, far:cm.far});
		jscene.cameras[cms] = cm;
	}

     var addCollider = function(t) {
        var cd = t.collider;
        switch(cd.type) {
            case "box":
                var s = J3D.Loader.v3FromArray(cd.size);
                var c = J3D.Loader.v3FromArray(cd.center);
                t.collider = J3D.Collider.Box({
                    minX: c.x + s.x * -0.5,
                    maxX: c.x + s.x * 0.5,
                    minY: c.y + s.y * -0.5,
                    maxY: c.y + s.y * 0.5,
                    minZ: c.z + s.z * -0.5,
                    maxZ: c.z + s.z * 0.5
                });
                break;
            case "sphere":
                var c = J3D.Loader.v3FromArray(cd.center);
                t.collider = J3D.Collider.Sphere(cd.radius, c);
                break;
            case "mesh":
                t.collider = J3D.Collider.Mesh( jmeshes[cd.mesh] );
                break;
        }


    }
	
	for(var i = 0; i < jscene.transforms.length; i++) {
		var t = jscene.transforms[i];
		t = J3D.Loader.fromObject(J3D.Transform, t);
		t.position = J3D.Loader.v3FromArray(t.position);
		t.rotation = J3D.Loader.v3FromArray(t.rotation);
		
		if(t.renderer) t.renderer = jscene.materials[t.renderer];
		if(t.mesh) t.geometry = jmeshes[t.mesh];
		if(t.light) t.light = jscene.lights[t.light];

        if(t.collider) {
            addCollider(t);
        }
		
		if (t.camera) {
			//jscene.cameras[t.camera].transform = t;
			t.camera = jscene.cameras[t.camera];
			engine.camera = t;
		}

		jscene.transforms[i] = t;
	}

	var findByUID = function(n) {
		for (var i = 0; i < jscene.transforms.length; i++) {
			if(jscene.transforms[i].uid == n) return jscene.transforms[i];
		}
	}
	
	for(var i = 0; i < jscene.transforms.length; i++) {
		var t = jscene.transforms[i];
		if (t.parent != null) {
			t.parent = findByUID(t.parent);
			t.parent.add(t);
		} else {
			engine.scene.add(t);
		}
	}
}

J3D.Loader.fetchShader = function(type, obj){
	var t = J3D.BuiltinShaders.fetch(type);
	for(var p in obj) t[p] = obj[p];
	return t;
}

J3D.Loader.fromObject = function(type, obj){
	var t = new type();
	for(var p in obj) t[p] = obj[p];
	return t;
}

J3D.Loader.v2FromArray = function(arr){
	return new v2(arr[0], arr[1]);
}

J3D.Loader.v3FromArray = function(arr){
	return new v3(arr[0], arr[1], arr[2]);
}

J3D.Loader.loadGLSL = function(path, onLoadedFunc){
	var request = new XMLHttpRequest();
	request.open("GET", path);
	
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			onLoadedFunc.call(null, J3D.ShaderUtil.parseGLSL(request.responseText));
		}
	}
	
	request.send();
}
