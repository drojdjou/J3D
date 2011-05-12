//# SkyboxVertex
uniform float mid;

varying vec3 vVertexPosition;

void main(void) {
	gl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition * mid, 1.0);
	vVertexPosition = aVertexPosition;	
}

//# SkyboxFragment
uniform samplerCube uCubemap;

varying vec3 vVertexPosition;

void main(void) {
	gl_FragColor = textureCube(uCubemap, vVertexPosition);
}