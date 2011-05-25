J3D.Gouraud = function() {
	this.name = "Gouraud";
	// Parameters for Gouraud shader
	this.color = J3D.Color.white;
	this.colorTexture;
	this.specularIntensity = 0;
	this.shininess = 32;
}

J3D.Gouraud.prototype.vertSource = function() {
	return J3D.ShaderSource.GouraudVertex;
}

J3D.Gouraud.prototype.fragSource = function() {
	return J3D.ShaderSource.GouraudFragment;
}

J3D.Gouraud.prototype.setupLocations = function(shader) {
	shader.uLight = [];
	
	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		shader.uLight[i] = {};
		shader.uLight[i].type = gl.getUniformLocation(shader, "uLight[" + i + "].type");
		shader.uLight[i].direction = gl.getUniformLocation(shader, "uLight[" + i + "].direction");
		shader.uLight[i].position = gl.getUniformLocation(shader, "uLight[" + i + "].position");
		shader.uLight[i].color = gl.getUniformLocation(shader, "uLight[" + i + "].color");
	}
	
	shader.uSpecularIntensity = gl.getUniformLocation(shader, "uSpecularIntensity");
	shader.uShininess = gl.getUniformLocation(shader, "uShininess");
	
	shader.uColorSampler = gl.getUniformLocation(shader, "uColorSampler");
 	shader.uColor = gl.getUniformLocation(shader, "uColor");
	shader.uHasColorSampler = gl.getUniformLocation(shader, "uHasColorSampler");
}

J3D.Gouraud.prototype.setup = function(mesh, shader, lights, camera){	

	gl.uniform4fv(shader.uColor, this.color.rgba());
	gl.uniform1f(shader.uSpecularIntensity, this.specularIntensity);
	gl.uniform1f(shader.uShininess, this.shininess);
	
	if (mesh.hasUV1) {		
		if (this.colorTexture != null) {
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.colorTexture.tex);
			gl.uniform1i(shader.uColorSampler, 0);
			gl.uniform1i(shader.uHasColorSampler, true);
		}
		else {
			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.uniform1i(shader.uHasColorSampler, false);
		}
	} else {
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.uniform1i(shader.uHasColorSampler, false);
	}

	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		var l = lights[i];
		if(l){
			gl.uniform1i(shader.uLight[i].type, lights[i].light.type);
			gl.uniform3fv(shader.uLight[i].direction, lights[i].light.direction.xyz());
			gl.uniform3fv(shader.uLight[i].color, lights[i].light.color.rgb());
			gl.uniform3fv(shader.uLight[i].position, lights[i].worldPosition.xyz());
		} else {
			gl.uniform1i(shader.uLight[i].type, J3D.NONE);
		}
	}
}