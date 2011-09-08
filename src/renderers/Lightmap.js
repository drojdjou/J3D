J3D.Lightmap = function() {}
J3D.Lightmap.prototype = new J3D.Shader("Lightmap", J3D.ShaderSource.LightmapVertex, J3D.ShaderSource.LightmapFragment);
J3D.Lightmap.prototype.constructor = J3D.Lightmap;
J3D.Lightmap.prototype.supr = J3D.Shader.prototype;

J3D.Lightmap.prototype.setup = function(shader, transform){
    for (var s in shader.uniforms) {
		if (s == "uLightmapSampler") {
			J3D.ShaderUtil.setTexture(shader, 1, "uLightmapSampler", J3D.LightmapAtlas[transform.lightmapIndex].tex);
		} else if(s == "uLightmapAtlas") {
			gl.uniform4fv(shader.uniforms.uLightmapAtlas.location, transform.lightmapTileOffset);
		} else if (this[s] != null) {
            J3D.ShaderUtil.setUniform(s, shader, this);
        }
    }
}

/*J3D.Lightmap = function() {
	this.name = "Lightmap";
	// Parameters for Lightmap shader
	this.color;
	this.colorTexture;
}

J3D.Lightmap.prototype.vertSource = function() {
	return J3D.ShaderSource.LightmapVertex;
}

J3D.Lightmap.prototype.fragSource = function() {
	return J3D.ShaderSource.LightmapFragment;
}

J3D.Lightmap.prototype.setup = function(mesh, shader, camera, transform){	
	gl.uniform4fv(shader.uniforms.uLightmapAtlas, transform.lightmapTileOffset);	
	gl.uniform4fv(shader.uniforms.uColor, this.color.rgba());
	
	if (this.colorTexture) {
		J3D.ShaderUtil.setTexture(shader, 0, "uColorSampler", this.colorTexture.tex);
	}
	
	J3D.ShaderUtil.setTexture(shader, 1, "uLightmapSampler", J3D.LightmapAtlas[transform.lightmapIndex].tex);
}*/