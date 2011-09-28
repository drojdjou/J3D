//#name Skybox
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
uniform float mid;

varying vec3 vVertexPosition;

void main(void) {
	gl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition * mid, 1.0);
	vVertexPosition = aVertexPosition;	
}

//#fragment
uniform samplerCube uCubemap;

varying vec3 vVertexPosition;

void main(void) {
	gl_FragColor = textureCube(uCubemap, vVertexPosition);
}