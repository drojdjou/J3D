J3D.BuiltinShaders = (function() {
	
	var shaders = {};

	var fetch = function(n) {
		if (!shaders[n]) {
			j3dlog("ERROR. Built-in shader " + n + " doesn't exist");
			return null;
		} else {
			return shaders[n].clone();
		}
	}
	
	var p = new J3D.Shader("Phong", J3D.ShaderSource.PhongVertex, J3D.ShaderSource.PhongFragment);
	p.su.color = J3D.Color.white;
    //p.su.specularIntensity = 0;
    //p.su.shininess = 0;
	p.hasColorTexture = false;
	shaders.Phong = p;
	
	var g = new J3D.Shader("Gouraud", J3D.ShaderSource.GouraudVertex, J3D.ShaderSource.GouraudFragment);
	g.su.color = J3D.Color.white;
	//g.su.specularIntensity = 0;
	//g.su.shininess = 0;
	g.hasColorTexture = false;
	shaders.Gouraud = g;
	
	var l = new J3D.Shader("Lightmap", J3D.ShaderSource.LightmapVertex, J3D.ShaderSource.LightmapFragment);
	l.setup = function(shader, transform) {
	    for (var s in shader.uniforms) {
			if (s == "lightmapTexture") {
				J3D.ShaderUtil.setTexture(shader, 1, "lightmapTexture", J3D.LightmapAtlas[transform.lightmapIndex].tex);
			} else if(s == "lightmapAtlas") {
				gl.uniform4fv(shader.uniforms.lightmapAtlas.location, transform.lightmapTileOffset);
			}
	    }
		
		J3D.Shader.prototype.setup.call(this, shader, transform);
	}
	shaders.Lightmap = l;
	
	shaders.Toon = new J3D.Shader("Toon", J3D.ShaderSource.ToonVertex, J3D.ShaderSource.ToonFragment);
	shaders.Reflective = new J3D.Shader("Reflective", J3D.ShaderSource.ReflectiveVertex, J3D.ShaderSource.ReflectiveFragment);
	shaders.Skybox = new J3D.Shader("Skybox", J3D.ShaderSource.SkyboxVertex, J3D.ShaderSource.SkyboxFragment);

	return { shaders:shaders, fetch:fetch };
}());
