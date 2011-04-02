phongShaderName = "Phong";

J3D.Phong = function() {
	this.shaderName = phongShaderName;
	
	// Parameters for Phong shader
	this.color = Color.white;
	this.colorTexture;
	this.specularIntensity = 0;
	this.shininess = 32;
}

J3D.Phong.prototype.setupLocations = function(shader) {
	shader.vertAttr = gl.getAttribLocation(shader, "aVertexPosition");
	gl.enableVertexAttribArray(shader.vertAttr);
	
	shader.normAttr = gl.getAttribLocation(shader, "aVertexNormal");
	gl.enableVertexAttribArray(shader.normAttr);
	
	shader.uv1Attr = gl.getAttribLocation(shader, "aTextureCoord");
	gl.enableVertexAttribArray(shader.uv1Attr);
		
	shader.projMat = gl.getUniformLocation(shader, "projMat");
	shader.mvMat = gl.getUniformLocation(shader, "uMVMatrix");
	shader.nMat = gl.getUniformLocation(shader, "uNMatrix");
	
	shader.uAmbientColor = gl.getUniformLocation(shader, "uAmbientColor");
	
	shader.uLight = [];
	
	for (var i = 0; i < J3D.PHONG_SHADER_MAX_LIGHTS; i++) {
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

J3D.Phong.prototype.setup = function(mesh, shader, lights, ambient){	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertBuf);
	gl.vertexAttribPointer(shader.vertAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normBuf);
	gl.vertexAttribPointer(shader.normAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv1buf);
	gl.vertexAttribPointer(shader.uv1Attr, mesh.uvSize, gl.FLOAT, false, 0, 0);		

	if (mesh.hasUV1) {
		if (this.colorTexture != null) {		
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.colorTexture.tex);
			gl.uniform1i(shader.samplerUniform, 0);
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

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.triBuf);
	
	gl.uniform4fv(shader.uColor, this.color.rgba());

	gl.uniform3fv(shader.uAmbientColor, ambient.rgb());
	
	for (var i = 0; i < J3D.PHONG_SHADER_MAX_LIGHTS; i++) {
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
	
	gl.uniform1f(shader.uSpecularIntensity, this.specularIntensity);
	gl.uniform1f(shader.uShininess, this.shininess);
}

// ############## Shader source

J3D.ShaderSource[phongShaderName] = {

name: phongShaderName,

vert: J3D.ShaderInclude.concat([

    "attribute vec3 aVertexPosition;",
    "attribute vec3 aVertexNormal;",
	"attribute vec2 aTextureCoord;",
 
    "uniform mat4 uMVMatrix;",
    "uniform mat4 projMat;",
    "uniform mat3 uNMatrix;",
 
    "uniform vec3 uAmbientColor;",
	
	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

    "void main(void) {",
	"	 vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);",
    "    gl_Position = projMat * vPosition;",
	
 	"	 vTextureCoord = aTextureCoord;",
	
    "    vNormal = uNMatrix * aVertexNormal;",
	"    vLight = uAmbientColor;",
	

    "}"
]).join("\n"),

frag: J3D.ShaderInclude.concat([
    "uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",

	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",
	
	"uniform lightSource uLight[4];",
	
	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

    "void main(void) {",
	"	vec4 tc = uColor.rgba;",
	"	if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",
	
	"	vec3 l = vLight;",
	"   float lum = brightness(tc.rgb);",
	"   l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[0]) * lum;",
	"   l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[1]) * lum;",
	"   l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[2]) * lum;",
	"   l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[3]) * lum;",
	
	"	gl_FragColor = vec4(tc.rgb * l, uColor.a);",
    "}"

]).join("\n")

};