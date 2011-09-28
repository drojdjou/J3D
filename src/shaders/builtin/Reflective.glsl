//#name Reflective
//#description Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude

varying vec3 vNormal;
varying vec3 refVec;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vNormal = normalize(nMatrix * aVertexNormal);	
	vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);
	refVec = reflect(incident, vNormal);	
}

//#fragment
uniform samplerCube uCubemap;

varying vec3 refVec;

void main(void) {
	gl_FragColor = textureCube(uCubemap, refVec);
}