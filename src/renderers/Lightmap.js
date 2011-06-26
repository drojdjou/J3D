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

J3D.Lightmap.prototype.setupLocations = function(shader) {
	shader.uColor = gl.getUniformLocation(shader, "uColor");
	shader.uColorSampler = gl.getUniformLocation(shader, "uColorSampler");
	shader.uLightmapSampler = gl.getUniformLocation(shader, "uLightmapSampler");
	shader.uLightmapAtlas = gl.getUniformLocation(shader, "uLightmapAtlas");
}

J3D.Lightmap.prototype.setup = function(mesh, shader, lights, camera, transform){	

	gl.uniform4fv(shader.uLightmapAtlas, transform.lightmapTileOffset);
	
	gl.uniform4fv(shader.uColor, this.color.rgba());
	
	if (this.colorTexture) {
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.colorTexture.tex);
		gl.uniform1i(shader.uColorSampler, 0);
	}
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, J3D.LightmapAtlas[transform.lightmapIndex].tex);
	gl.uniform1i(shader.uLightmapSampler, 1);
}