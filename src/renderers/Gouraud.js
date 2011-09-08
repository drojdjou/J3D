J3D.Gouraud = function() {
	this.uColor = J3D.Color.white;
	this.uSpecularIntensity = 0;
	this.uShininess = 0;
	this.uColorSampler = null;
}

J3D.Gouraud.prototype = new J3D.Shader("Gouraud", J3D.ShaderSource.GouraudVertex, J3D.ShaderSource.GouraudFragment);
J3D.Gouraud.prototype.constructor = J3D.Gouraud;
J3D.Gouraud.prototype.supr = J3D.Shader.prototype;

J3D.Gouraud.prototype.setup = function(shader) {
	this.uHasColorSampler = (this.uColorSampler != null);
	
	for(var s in shader.uniforms) {
		if (this[s] != null) J3D.ShaderUtil.setUniform(s, shader, this);
	}
}