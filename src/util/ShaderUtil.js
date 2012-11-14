J3D.ShaderUtil = {};

J3D.ShaderUtil.setTexture = function(shader, id, uniformName, texture) {
    gl.activeTexture(33984 + id);

    if(texture.update) texture.update();
    if(texture.tex) texture = texture.tex;

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(shader.uniforms[uniformName].location, id);
}

J3D.ShaderUtil.setTextureCube = function(shader, id, uniformName, texture){
    gl.activeTexture(33984 + id);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.tex);
	gl.uniform1i(shader.uniforms[uniformName].location, id);
}

J3D.ShaderUtil.setAttributes = function(shader, geometry) {
	for(var i = 0; i < geometry.arrays.length; i++) {
		var vbo = geometry.arrays[i];
		if(shader.attributes[vbo.name] != null) {
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo.buffer);
			gl.vertexAttribPointer(shader.attributes[vbo.name], vbo.itemSize, gl.FLOAT, false, 0, 0);
		}
	}
}

J3D.ShaderUtil.setLights = function(shader, lights) {
    for (var i = 0; i < J3D.SHADER_MAX_LIGHTS; i++) {
		var l = lights[i];

		if(l && shader.uniforms["uLight" + i + ".type"]){
            gl.uniform1i(shader.uniforms["uLight" + i + ".type"].location, 		lights[i].light.type);

			gl.uniform3fv(shader.uniforms["uLight" + i + ".direction"].location, 	lights[i].worldForward);
			gl.uniform3fv(shader.uniforms["uLight" + i + ".color"].location, 		lights[i].light.color.rgb());
			gl.uniform3fv(shader.uniforms["uLight" + i + ".position"].location, 	lights[i].worldPosition);
			gl.uniform1f(shader.uniforms["uLight" + i + ".intensity"].location, 	lights[i].light.intensity);
            gl.uniform1f(shader.uniforms["uLight" + i + ".angleFalloff"].location, 	lights[i].light.angleFalloff);
            gl.uniform1f(shader.uniforms["uLight" + i + ".angle"].location, 	lights[i].light.angle);
		} else if(shader.uniforms["uLight" + i + ".type"]) {
			gl.uniform1i(shader.uniforms["uLight" + i + ".type"].location, J3D.NONE);
		} else {
            // light not set
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
	if(v.toUniform) v = v.toUniform(n.type);

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

J3D.ShaderUtil.parseGLSL = function(source){
	var ls = source.split("\n");
	
	var vs = "";
	var fs = "";

	var meta = {};
	meta.common = "";
	meta.includes = [];
	meta.vertexIncludes = [];
	meta.fragmentIncludes = [];
	var section = 0;
	
	var checkMetaData = function(tag, line) {
		var p = line.indexOf(tag);
		
		if(p > -1) {
			var d = line.substring(p + tag.length + 1);
			return d;
		}
		
		return null;
	}
	
	for(var i = 0; i < ls.length; i++) {
		if(ls[i].indexOf("//#") > -1) {
			if (ls[i].indexOf("//#fragment") > -1) {
				section++;
			} else if (ls[i].indexOf("//#vertex") > -1) {
				section++;
			} else {	
				meta.name = meta.name || checkMetaData("name", ls[i]);
//				meta.author = meta.author || checkMetaData("author", ls[i]);
//				meta.description = meta.description || checkMetaData("description", ls[i]);
				
				var inc = checkMetaData("include", ls[i]);
				if(inc) {
					switch(section){
						case 0:
							meta.includes.push(inc); 
							break;
						case 1:
							meta.vertexIncludes.push(inc); 
							break;
						case 2:
							meta.fragmentIncludes.push(inc); 
							break;
					}
				}
			}
		} else {
			var l = ls[i];
			if(l.indexOf("//") > -1) l = l.substring(0, l.indexOf("//"));
			switch(section){
				case 0:
					meta.common += l + "\n";
					break;
				case 1:
					vs += l + "\n";
					break;
				case 2:
					fs += l + "\n";
					break;
			}
		}
	}
	
	var n = meta.name || "Shader" + Math.round(Math.random() * 1000);
	return new J3D.Shader(n, vs, fs, meta);
}
