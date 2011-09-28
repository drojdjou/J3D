//#name DarkGlass
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

void main(void) {
	vec4 mp = vec4(aVertexPosition, 1.0);
	gl_Position = mvpMatrix() * mp;
	vNormal = normalize(nMatrix * aVertexNormal);	
	vec3 incident = normalize((mp * mMatrix).xyz - uEyePosition);
	
	// t = reflect(incident, vNormal);	
	tr = refract(incident, vNormal, chromaticDispertion.x);
	tg = refract(incident, vNormal, chromaticDispertion.y);
	tb = refract(incident, vNormal, chromaticDispertion.z);
	
	// bias, scale, 1, power
	rfac = bias + scale * pow(1.0 + dot(incident, vNormal), power);
	
	vTexCoord = aTextureCoord;
}

//#fragment
uniform samplerCube uCubemap;
uniform sampler2D uColorTexture;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main(void) {
	vec4 ref = texture2D(uColorTexture, vTexCoord);
	ref.rgb *= 0.01;

	vec4 ret = vec4(1.0);
	ret.r = textureCube(uCubemap, tr).r;
	ret.g = textureCube(uCubemap, tg).g;
	ret.b = textureCube(uCubemap, tb).b;

	gl_FragColor = ret * rfac + ref;// * (1.0 - rfac);
}