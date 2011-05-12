// File generated with src/shaders/buildShaders.py. Do not edit //

J3D.ShaderSource = {};

J3D.ShaderSource.CommonInclude = [
	"#ifdef GL_ES",
	"precision highp float;",
	"#endif",

	"uniform mat4 mMatrix;",
	"uniform mat4 vMatrix;",
	"uniform mat3 nMatrix;",
	"uniform mat4 pMatrix;",
	"uniform vec3 uEyePosition;",

	"mat4 mvpMatrix() {",
	"return pMatrix * vMatrix * mMatrix;",
	"}",

	"mat4 mvMatrix() {",
	"return vMatrix * mMatrix;",
	"}",

	"struct lightSource {",
	"int type;",
	"vec3 direction;",
	"vec3 color;",
	"vec3 position;",
	"};",

	"uniform lightSource uLight[4];",
	"uniform vec3 uAmbientColor;",

	"float luminance(vec3 c) {",
	"return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;",
	"}",

	"float brightness(vec3 c) {",
	"return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;",
	"}",

	"vec3 computeLight(vec4 p, vec3 n, float si, float sh, lightSource light){",
	"vec3 ld;",

	"vec4 lp = vMatrix * vec4(light.position, 1.0);",

	"if(light.type == 0) return vec3(0);",
	"else if(light.type == 1) ld = light.direction;",
	"else if(light.type == 2) ld = normalize(lp.xyz - p.xyz);",
	"float dif = max(dot(n, ld), 0.0);",

	"float spec = 0.0;",

	"if(si > 0.0) {",
	"vec3 eyed = normalize(-p.xyz);",
	"vec3 refd = reflect(-ld, n);",
	"spec = pow(max(dot(refd, eyed), 0.0), sh) * si;",
	"};",

	"return light.color * dif + light.color * spec;",
	"}",

	"vec3 computeLights(vec4 p, vec3 n, float si, float sh) {",
	"vec3 s = computeLight(p, n, si, sh, uLight[0]);",
	"s += computeLight(p, n, si, sh, uLight[1]);",
	"s += computeLight(p, n, si, sh, uLight[2]);",
	"s += computeLight(p, n, si, sh, uLight[3]);",
	"return s;",
	"}",
""].join("\n");


J3D.ShaderSource.GlassVertex = [
	"varying vec3 vNormal;",
	"varying vec3 t;",
	"varying vec3 tr;",
	"varying vec3 tg;",
	"varying vec3 tb;",
	"varying float rfac;",

	"void main(void) {",
	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"vNormal = normalize(nMatrix * aVertexNormal);",
	"vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);",

	"t = reflect(incident, vNormal);",
	"tr = refract(incident, vNormal, 0.90);",
	"tg = refract(incident, vNormal, 0.97);",
	"tb = refract(incident, vNormal, 1.04);",

	"rfac = 0.9 + 0.4 * pow(1.0 + dot(incident, vNormal), 1.1);",
	"}",

""].join("\n");

J3D.ShaderSource.GlassFragment = [
	"uniform samplerCube uCubemap;",

	"varying vec3 vNormal;",
	"varying vec3 t;",
	"varying vec3 tr;",
	"varying vec3 tg;",
	"varying vec3 tb;",
	"varying float rfac;",

	"void main(void) {",
	"vec4 ref = textureCube(uCubemap, t);",

	"vec4 ret = vec4(1);",
	"ret.r = textureCube(uCubemap, tr).r;",
	"ret.g = textureCube(uCubemap, tg).g;",
	"ret.b = textureCube(uCubemap, tb).b;",

	"gl_FragColor = ret * rfac + ref * (1.0 - rfac);",
	"}",
""].join("\n");

J3D.ShaderSource.GouraudVertex = [
	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 p = mvMatrix() * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * p;",

	"vTextureCoord = aTextureCoord;",

	"vec3 n = normalize( nMatrix * aVertexNormal );",
	"vLight = uAmbientColor + computeLights(p, n, uSpecularIntensity, uShininess);",
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
	"varying vec3 vColor;",

	"void main(void) {",
	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"vColor = normalize( aVertexNormal / 2.0 + vec3(0.5) );",
	"}",

""].join("\n");

J3D.ShaderSource.Normal2ColorFragment = [
	"varying vec3 vColor;",

	"void main(void) {",
	"gl_FragColor = vec4(vColor, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.PhongVertex = [
	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

	"void main(void) {",
	"vTextureCoord = aTextureCoord;",
	"vNormal = nMatrix * aVertexNormal;",
	"vPosition = mvMatrix() * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * vPosition;",
	"}",

""].join("\n");

J3D.ShaderSource.PhongFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",

	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

	"void main(void) {",
	"vec4 tc = uColor.rgba;",
	"if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",

	"float lum = brightness(tc.rgb);",
	"vec3 l = uAmbientColor + computeLights(vPosition, vNormal, uSpecularIntensity, uShininess) * lum;",

	"gl_FragColor = vec4(tc.rgb * l, uColor.a);",
	"}",
""].join("\n");


J3D.ShaderSource.ReflectiveVertex = [
	"varying vec3 vNormal;",
	"varying vec3 refVec;",

	"void main(void) {",
	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"vNormal = normalize(nMatrix * aVertexNormal);",
	"vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);",
	"refVec = reflect(incident, vNormal);",
	"}",

""].join("\n");

J3D.ShaderSource.ReflectiveFragment = [
	"uniform samplerCube uCubemap;",

	"varying vec3 refVec;",

	"void main(void) {",
	"gl_FragColor = textureCube(uCubemap, refVec);",
	"}",
""].join("\n");

J3D.ShaderSource.SkyboxVertex = [
	"uniform float mid;",

	"varying vec3 vVertexPosition;",

	"void main(void) {",
	"gl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition * mid, 1.0);",
	"vVertexPosition = aVertexPosition;",
	"}",

""].join("\n");

J3D.ShaderSource.SkyboxFragment = [
	"uniform samplerCube uCubemap;",

	"varying vec3 vVertexPosition;",

	"void main(void) {",
	"gl_FragColor = textureCube(uCubemap, vVertexPosition);",
	"}",
""].join("\n");

J3D.ShaderSource.VertexInclude = [
	"attribute vec3 aVertexPosition;",
	"attribute vec3 aVertexNormal;",
	"attribute vec2 aTextureCoord;",
""].join("\n");

