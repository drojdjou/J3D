//#name Glass
//#description Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html
//#author bartekd

//#include CommonInclude

varying vec3 vNormal;
varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

//#vertex
//#include VertexInclude

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vNormal = normalize(nMatrix * aVertexNormal);	
	vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);
	
	t = reflect(incident, vNormal);	
	tr = refract(incident, vNormal, chromaticDispertion.x);
	tg = refract(incident, vNormal, chromaticDispertion.y);
	tb = refract(incident, vNormal, chromaticDispertion.z);
	
	// bias, scale, 1, power
	rfac = bias + scale * pow(1.0 + dot(incident, vNormal), power);
}

//#fragment
uniform sampler2D uTexture;

vec2 normalToUv(vec3 n) {
	vec3 xy = vec3(n.x, n.y, 0);
	vec3 xz = vec3(n.x, 0, n.z);

	vec3 up = vec3(0, 1, 0);
	vec3 left = vec3(1, 0, 0);

	float tx = dot(xy, up) * 0.5 + 0.5;
	float ty = dot(xz, left) * 0.5 + 0.5;

	return vec2(ty, tx);
}

void main(void) {
	vec4 col = vec4(0.6, 0.05, 0.05, 1.0);

	vec4 ref = texture2D(uTexture, normalToUv(t));

	float lum = luminance(ref.rgb);
	lum = pow(lum, 4.0);
	// ref.rgb *= 0.01;
	ref = mix(col, ref, lum);

	vec4 ret = vec4(1);
	ret.r = texture2D(uTexture, normalToUv(tr)).r;
	ret.g = texture2D(uTexture, normalToUv(tg)).g;
	ret.b = texture2D(uTexture, normalToUv(tb)).b;

	lum = luminance(ret.rgb);
	// lum = pow(lum, 4.0);
	ret = mix(col, ret, lum);
	
	// gl_FragColor = ret * rfac + ref * (1.0 - rfac);
	gl_FragColor = ret * rfac + ref;
	// gl_FragColor = ref;
}