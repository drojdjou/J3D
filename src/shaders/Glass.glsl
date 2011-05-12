// Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html
// TODO: take the bias, scale, power and chromatic dispersion parameters out to uniforms

//# GlassVertex
varying vec3 vNormal;
varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vNormal = normalize(nMatrix * aVertexNormal);	
	vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);
	
	t = reflect(incident, vNormal);	
	tr = refract(incident, vNormal, 0.90);
	tg = refract(incident, vNormal, 0.97);
	tb = refract(incident, vNormal, 1.04);
	
	// bias, scale, 1, power
	rfac = 0.9 + 0.4 * pow(1.0 + dot(incident, vNormal), 1.1);
}

//# GlassFragment
uniform samplerCube uCubemap;

varying vec3 vNormal;
varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main(void) {
	vec4 ref = textureCube(uCubemap, t);

	vec4 ret = vec4(1);
	ret.r = textureCube(uCubemap, tr).r;
	ret.g = textureCube(uCubemap, tg).g;
	ret.b = textureCube(uCubemap, tb).b;
	
	gl_FragColor = ret * rfac + ref * (1.0 - rfac);
}