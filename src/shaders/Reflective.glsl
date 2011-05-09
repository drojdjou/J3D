//# ReflectiveVertex
varying vec3 vNormal;

void main(void) {
	gl_Position = pMatrix *  mvMatrix * vec4(aVertexPosition, 1.0);
	vNormal = nMatrix * aVertexNormal;	
}

//# ReflectiveFragment
uniform samplerCube uCubemap;

varying vec3 vNormal;

void main(void) {
	gl_FragColor = textureCube(uCubemap, vNormal);
}