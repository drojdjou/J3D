/**
    @class <p>A utility to fetch built-in shaders. It is a singleton instantiated by the {@link J3D.Engine} constructor.</p>

    <p>Currently built-in shaders include:
    <ul>
        <li>Phong</li>
        <li>Gouraud</li>
        <li>Lightmap</li>
        <li>Reflective</li>
        <li>Skybox</li>
        <li>Normal2Color</li>
        <li>Selflit</li>
    </ul>
    </p>
 */
J3D.BuiltinShaders = function() {
	
	var shaders = {};

    /**
     * @public Gets a copy of a build-in shader.
     *
     * @param n The name of the shader as String (ex. "Phong", "Gouraud").
     *
     * @return An instance of J3D.Shader
     *
     * @throws J3D.Error.NO_BUILTIN_SHADER if the shader does not exist.
     */
	var fetch = function(n) {
		if (!shaders[n]) {
			throw J3D.Error.NO_BUILTIN_SHADER + n;
		} else {
			return shaders[n].clone();
		}
	}

	var p = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Phong);
	p.color = J3D.Color.white;
    //p.su.specularIntensity = 0;
    //p.su.shininess = 0;
	p.hasColorTexture = false;
	shaders.Phong = p;
	
	var g = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Gouraud);
	g.color = J3D.Color.white;
    g.emissive = J3D.Color.black;
	//g.su.specularIntensity = 0;
	//g.su.shininess = 0;
	g.hasColorTexture = false;
	shaders.Gouraud = g;
	
	var l =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Lightmap);
	l.setup = function(shader, transform) {
	    for (var s in shader.uniforms) {
			if (s == "lightmapTexture") {
				J3D.ShaderUtil.setTexture(shader, 1, "lightmapTexture", J3D.LightmapAtlas[transform.lightmapIndex]);
			} else if(s == "lightmapAtlas") {
				gl.uniform4fv(shader.uniforms.lightmapAtlas.location, transform.lightmapTileOffset);
			}
	    }
		
		J3D.Shader.prototype.setup.call(this, shader, transform);
	}
	shaders.Lightmap = l;
	
	shaders.Reflective =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Reflective);
	shaders.Skybox =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Skybox);
	shaders.Vignette =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Vignette);

	shaders.Normal2Color = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Normal2Color);

    var s = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Selflit);
    s.color = J3D.Color.white;
    shaders.Selflit = s;

	return { shaders:shaders, fetch:fetch };
};
