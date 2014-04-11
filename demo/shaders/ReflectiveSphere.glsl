//#name ReflectiveSphere
//#description Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html
//#author bartekd

//#include CommonInclude

varying vec3 refVec;


//#vertex
//#include VertexInclude

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vec3 normal = normalize(nMatrix * aVertexNormal);
	vec3 incident = normalize( (mMatrix * vec4(aVertexPosition, 1.0)).xyz - uEyePosition);
	refVec = reflect(incident, normal);
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

	vec2 uvRef = normalToUv(refVec);

	vec3 reflCol = texture2D(uTexture, uvRef).rgb;
	float lum = luminance(reflCol);
	vec3 color = vec3(0.7, 0.0, 0.0);

	gl_FragColor = vec4(mix(color, reflCol / lum, lum), 1.0);
}