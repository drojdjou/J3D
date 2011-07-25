J3D.Lightmap = function() {
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

J3D.Lightmap.prototype.setup = function(mesh, shader, lights, camera, transform){	
	gl.uniform4fv(shader.uniforms.uLightmapAtlas, transform.lightmapTileOffset);	
	gl.uniform4fv(shader.uniforms.uColor, this.color.rgba());
	
	if (this.colorTexture) {
		J3D.ShaderUtil.setTexture(shader, 0, "uColorSampler", this.colorTexture.tex);
	}
	
	J3D.ShaderUtil.setTexture(shader, 1, "uLightmapSampler", J3D.LightmapAtlas[transform.lightmapIndex].tex);
}