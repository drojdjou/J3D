//# Normal2ColorVertex
varying vec3 vColor;

void main(void) {
	gl_Position = projMat *  uMVMatrix * vec4(aVertexPosition, 1.0);
	vColor = normalize( uNMatrix * aVertexNormal );	
}

//# Normal2ColorFragment
varying vec3 vColor;

void main(void) {
	gl_FragColor = vec4(vColor, 1.0);
}