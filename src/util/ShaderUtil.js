J3D.ShaderUtil = {};

J3D.ShaderUtil.saveUniformLocations = function(shader, uniforms){
	for(var u in uniforms) {
		shader[uniforms[u]] = gl.getUniformLocation(shader, uniforms[u]);
	}
}

J3D.ShaderUtil.setTexture = function(shader, id, uniformName, texture){
	gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(shader[uniformName], id);
}

J3D.ShaderUtil.setupLights = function(shader){
	shader.uLight = [];
	
	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		shader.uLight[i] = {};
		shader.uLight[i].type = gl.getUniformLocation(shader, "uLight[" + i + "].type");
		shader.uLight[i].direction = gl.getUniformLocation(shader, "uLight[" + i + "].direction");
		shader.uLight[i].position = gl.getUniformLocation(shader, "uLight[" + i + "].position");
		shader.uLight[i].color = gl.getUniformLocation(shader, "uLight[" + i + "].color");
	}
}

J3D.ShaderUtil.setLights = function(shader, lights) {
	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		var l = lights[i];
		if(l){
			gl.uniform1i(shader.uLight[i].type, lights[i].light.type);
			gl.uniform3fv(shader.uLight[i].direction, lights[i].light.direction.xyz());
			gl.uniform3fv(shader.uLight[i].color, lights[i].light.color.rgb());
			gl.uniform3fv(shader.uLight[i].position, lights[i].worldPosition.xyz() );			
		} else {
			gl.uniform1i(shader.uLight[i].type, J3D.NONE);
		}
	}
}
