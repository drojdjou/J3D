J3D.Phong = function() {
	this.name = "Phong";
	// Parameters for Phong shader
	this.color = J3D.Color.white;
	this.colorTexture;
	this.specularIntensity = 0;
	this.shininess = 32;
}

J3D.Phong.prototype.vertSource = function() {
	return J3D.ShaderSource.PhongVertex;
}

J3D.Phong.prototype.fragSource = function() {
	return J3D.ShaderSource.PhongFragment;
}

J3D.Phong.prototype.setup = function(mesh, shader, lights, camera){	

	gl.uniform4fv(shader.uniforms.uColor, this.color.rgba());
	gl.uniform1f(shader.uniforms.uSpecularIntensity, this.specularIntensity);
	gl.uniform1f(shader.uniforms.uShininess, this.shininess);
		
	if (mesh.hasUV1 && this.colorTexture != null && this.colorTexture.tex != null) {		
		J3D.ShaderUtil.setTexture(shader, 0, "uColorSampler", this.colorTexture.tex);
		gl.uniform1i(shader.uniforms.uHasColorSampler, true);
	}
	else {
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.uniform1i(shader.uniforms.uHasColorSampler, false);
	}

	J3D.ShaderUtil.setLights(shader, lights);
}