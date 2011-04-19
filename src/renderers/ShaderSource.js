// File generated with src/shaders/compileShaders.py. Do not edit //

J3D.ShaderSource = {};

J3D.ShaderSource.CommonInclude = [
	"#ifdef GL_ES",
	"precision highp float;",
	"#endif",

	"float luminance(vec3 c) {",
	"return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;",
	"}",

	"float brightness(vec3 c) {",
	"return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;",
	"}",

	"struct lightSource {",
	"int type;",
	"vec3 direction;",
	"vec3 color;",
	"vec3 position;",
	"};",

	"vec3 computeLight(vec4 p, vec3 n, float si, float sh, lightSource light){",
	"vec3 ld;",

	"if(light.type == 0) return vec3(0);",
	"else if(light.type == 1) ld = light.direction;",
	"else if(light.type == 2) ld = normalize(light.position - p.xyz);",
	"float dif = max(dot(n, ld), 0.0);",

	"float spec = 0.0;",

	"if(si > 0.0) {",
	"vec3 eyed = normalize(-p.xyz);",
	"vec3 refd = reflect(-ld, n);",
	"spec = pow(max(dot(refd, eyed), 0.0), sh) * si;",
	"};",

	"return light.color * dif + light.color * spec;",
	"}",

""].join("\n");

J3D.ShaderSource.GouraudVertex = [
	"attribute vec3 aVertexPosition;",
	"attribute vec3 aVertexNormal;",
	"attribute vec2 aTextureCoord;",

	"uniform mat4 uMVMatrix;",
	"uniform mat4 projMat;",
	"uniform mat3 uNMatrix;",
	"uniform vec3 uAmbientColor;",
	"uniform lightSource uLight[4];",
	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 p = uMVMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = projMat * p;",

	"vTextureCoord = aTextureCoord;",

	"vec3 n = normalize( uNMatrix * aVertexNormal );",
	"vLight = uAmbientColor;",

	"vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[0]);",
	"vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[1]);",
	"vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[2]);",
	"vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[3]);",
	"}",

""].join("\n");

J3D.ShaderSource.GouraudFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",

	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 tc = uColor.rgba;",
	"if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",
	"gl_FragColor = vec4(tc.rgb * vLight, uColor.a);",
	"}",
""].join("\n");

J3D.ShaderSource.Normal2ColorVertex = [
	"attribute vec3 aVertexPosition;",
	"attribute vec3 aVertexNormal;",

	"uniform mat4 uMVMatrix;",
	"uniform mat4 projMat;",
	"uniform mat3 uNMatrix;",

	"varying vec3 vColor;",

	"void main(void) {",
	"gl_Position = projMat *  uMVMatrix * vec4(aVertexPosition, 1.0);",
	"vColor = normalize( uNMatrix * aVertexNormal );",
	"}",

""].join("\n");

J3D.ShaderSource.Normal2ColorFragment = [
	"varying vec3 vColor;",

	"void main(void) {",
	"gl_FragColor = vec4(vColor, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.PhongVertex = [
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
	"vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = projMat * vPosition;",

	"vTextureCoord = aTextureCoord;",

	"vNormal = uNMatrix * aVertexNormal;",
	"vLight = uAmbientColor;",
	"}",

""].join("\n");

J3D.ShaderSource.PhongFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",
	"uniform lightSource uLight[4];",
	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

	"void main(void) {",
	"vec4 tc = uColor.rgba;",
	"if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",

	"vec3 l = vLight;",
	"float lum = brightness(tc.rgb);",
	"l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[0]) * lum;",
	"l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[1]) * lum;",
	"l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[2]) * lum;",
	"l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[3]) * lum;",

	"gl_FragColor = vec4(tc.rgb * l, uColor.a);",
	"}",
""].join("\n");

