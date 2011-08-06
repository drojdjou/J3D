J3D.ShaderUtil = {};

J3D.ShaderUtil.setTexture = function(shader, id, uniformName, texture){
	gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(shader.uniforms[uniformName], id);
}

J3D.ShaderUtil.setTextureCube = function(shader, id, uniformName, texture){
	gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
	gl.uniform1i(shader.uniforms[uniformName], id);
}

J3D.ShaderUtil.setLights = function(shader, lights) {
	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		var l = lights[i];
		if(l){
			gl.uniform1i(shader.uniforms["uLight[" + i + "].type"], 		lights[i].light.type);
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].direction"], 	lights[i].light.direction.xyz());
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].color"], 		lights[i].light.color.rgb());
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].position"], 	lights[i].worldPosition.xyz());			
		} else {
			gl.uniform1i(shader.uniforms["uLight[" + i + "].type"], J3D.NONE);
		}
	}
}

J3D.ShaderUtil.setUniform = function(name, value) {
	//
}
