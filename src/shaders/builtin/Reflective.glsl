//#name Reflective
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
uniform samplerCube uCubemap;

void main(void) {
	gl_FragColor = textureCube(uCubemap, refVec);
}