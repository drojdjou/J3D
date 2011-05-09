//# SkyboxVertex
uniform vec4 uCameraPosition;

varying vec3 vVertexPosition;

void main(void) {
	gl_Position = pMatrix * mvMatrix * vec4(aVertexPosition * uCameraPosition.w + uCameraPosition.xyz, 1.0);
	vVertexPosition = aVertexPosition;	
}

//# SkyboxFragment
uniform samplerCube uCubemap;

varying vec3 vVertexPosition;

void main(void) {
	gl_FragColor = textureCube(uCubemap, vVertexPosition);
}