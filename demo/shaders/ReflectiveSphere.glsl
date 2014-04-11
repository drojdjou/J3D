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

void main(void) {

	vec3 xy = vec3(refVec.x, refVec.y, 0);
	vec3 xz = vec3(refVec.x, 0, refVec.z);

	vec3 up = vec3(0, 1, 0);
	vec3 left = vec3(1, 0, 0);

	vec2 uvRef = vec2(dot(xy, up) * 0.5 + 0.5, dot(xz, left) * 0.5 + 0.5);

	gl_FragColor = texture2D(uTexture, uvRef);
}