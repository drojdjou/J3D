//# Normal2ColorVertex
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
 
uniform mat4 uMVMatrix;
uniform mat4 projMat;
uniform mat3 uNMatrix;
	
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