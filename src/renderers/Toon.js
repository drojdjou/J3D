J3D.Toon = function() {
	this.name = "Toon";
	
	this.color = J3D.Color.white;
	this.rampTexture;
	this.specularIntensity = 0;
	this.shininess = 32;
}

J3D.Toon.prototype.vertSource = function() {
	return J3D.ShaderSource.ToonVertex;
}

J3D.Toon.prototype.fragSource = function() {
	return J3D.ShaderSource.ToonFragment;
}

J3D.Toon.prototype.setup = function(mesh, shader, lights, camera){	
	gl.uniform4fv(shader.uColor, this.color.rgba());
	J3D.ShaderUtil.setTexture(shader, 0, "uColorSampler", this.rampTexture.tex);
	J3D.ShaderUtil.setLights(shader, lights);
}