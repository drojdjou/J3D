J3D.ShaderUtil = {};

J3D.ShaderUtil.setTexture = function(shader, id, uniformName, texture){
	gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(shader.uniforms[uniformName].location, id);
}

J3D.ShaderUtil.setTextureCube = function(shader, id, uniformName, texture){
	gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
	gl.uniform1i(shader.uniforms[uniformName].location, id);
}

J3D.ShaderUtil.setLights = function(shader, lights) {
	for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		var l = lights[i];
		if(l && shader.uniforms["uLight[" + i + "].type"]){
			gl.uniform1i(shader.uniforms["uLight[" + i + "].type"].location, 		lights[i].light.type);
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].direction"].location, 	lights[i].light.direction.xyz());
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].color"].location, 		lights[i].light.color.rgb());
			gl.uniform3fv(shader.uniforms["uLight[" + i + "].position"].location, 	lights[i].worldPosition.xyz());			
		} else if(shader.uniforms["uLight[" + i + "].type"]) {
			gl.uniform1i(shader.uniforms["uLight[" + i + "].type"].location, J3D.NONE);
		} else {
			//console.log("Light not set " + i);
		}
	}
}

J3D.ShaderUtil.isTexture = function(t) {
	return t == gl.SAMPLER_2D || t == gl.SAMPLER_CUBE;
}

J3D.ShaderUtil.getTypeName = function(t) {
	switch(t) {
		case gl.BYTE:   	  return "BYTE (0x1400)";
		case gl.UNSIGNED_BYTE:return "UNSIGNED_BYTE (0x1401)";
		case gl.SHORT:   	  return "SHORT (0x1402)";
		case gl.UNSIGNED_SHORT:return "UNSIGNED_SHORT (0x1403)";
		case gl.INT:   		  return "INT (0x1404)";
		case gl.UNSIGNED_INT: return "UNSIGNED_INT (0x1405)";
		case gl.FLOAT:   	  return "FLOAT (0x1406)";
		case gl.FLOAT_VEC2:   return "FLOAT_VEC2 (0x8B50)";
		case gl.FLOAT_VEC3:   return "FLOAT_VEC3 (0x8B51)";
		case gl.FLOAT_VEC4:   return "FLOAT_VEC4 (0x8B52)";
		case gl.INT_VEC2:     return "INT_VEC2   (0x8B53)";
		case gl.INT_VEC3:     return "INT_VEC3   (0x8B54)";
		case gl.INT_VEC4:     return "INT_VEC4   (0x8B55)";
		case gl.BOOL:         return "BOOL 		(0x8B56)";
		case gl.BOOL_VEC2:    return "BOOL_VEC2  (0x8B57)";
		case gl.BOOL_VEC3:    return "BOOL_VEC3  (0x8B58)";
		case gl.BOOL_VEC4:    return "BOOL_VEC4  (0x8B59)";
		case gl.FLOAT_MAT2:   return "FLOAT_MAT2 (0x8B5A)";
		case gl.FLOAT_MAT3:   return "FLOAT_MAT3 (0x8B5B)";
		case gl.FLOAT_MAT4:   return "FLOAT_MAT4 (0x8B5C)";
		case gl.SAMPLER_2D:   return "SAMPLER_2D (0x8B5E)";
		case gl.SAMPLER_CUBE: return "SAMPLER_CUBE (0x8B60)";
		default: return "Unknown (" + t.toString(16) + ")";
	}
}

J3D.ShaderUtil.setUniform = function(name, dst, src) {
	var n = dst.uniforms[name];
	if(!n) return;

	var v = src[name];
	if(v.toUniform) v = v.toUniform();

	switch (n.type) {
		case gl.BYTE:
			gl.uniform1i(n.location, v);
			break;
		case gl.UNSIGNED_BYTE:
			gl.uniform1i(n.location, v);
			break;
		case gl.SHORT:
			gl.uniform1i(n.location, v);
			break;
		case gl.UNSIGNED_SHORT:
			gl.uniform1i(n.location, v);
			break;
		case gl.INT:
			gl.uniform1i(n.location, v);
			break;
		case gl.INT_VEC2:
			gl.uniform2iv(n.location, v);
			break;
		case gl.INT_VEC3:
			gl.uniform3iv(n.location, v);
			break;
		case gl.INT_VEC4:
			gl.uniform4iv(n.location, v);
			break;
		case gl.UNSIGNED_INT:
			gl.uniform1i(n.location, v);
			break;
		case gl.FLOAT:
			gl.uniform1f(n.location, v);
			break;
		case gl.FLOAT_VEC2:
			gl.uniform2fv(n.location, v);
			break;
		case gl.FLOAT_VEC3:
			gl.uniform3fv(n.location, v);
			break;
		case gl.FLOAT_VEC4:
			gl.uniform4fv(n.location, v);
			break;
		case gl.BOOL:
			gl.uniform1i(n.location, v);
			break;
		case gl.BOOL_VEC2:
			gl.uniform2iv(n.location, v);
			break;
		case gl.BOOL_VEC3:
			gl.uniform3iv(n.location, v);
			break;
		case gl.BOOL_VEC4:
			gl.uniform4iv(n.location, v);
			break;
		// TODO: Test matrices
		case gl.FLOAT_MAT2:
			gl.uniformMatrix2fv(n.location, false, v);
			break;
		case gl.FLOAT_MAT3:
			gl.uniformMatrix3fv(n.location, false, v);
			break;
		case gl.FLOAT_MAT4:
			gl.uniformMatrix4fv(n.location, false, v);
			break;
		case gl.SAMPLER_2D:
			J3D.ShaderUtil.setTexture(dst, n.texid, name, v);
			break;
		case gl.SAMPLER_CUBE:
			J3D.ShaderUtil.setTextureCube(dst, n.texid, name, v);
			break;
		default:
			return "WARNING! Unknown uniform type ( 0x" + n.type.toString(16) + " )";
	}
}
