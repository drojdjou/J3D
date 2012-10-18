//#name Normal2Color
//#description Simplest shader possible, no includes
//#author bartekd

precision mediump float;
varying vec3 vColor;

//#vertex

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 mMatrix;
uniform mat4 vMatrix;
uniform mat4 pMatrix;

void main(void) {
	gl_Position = pMatrix * vMatrix * mMatrix * vec4(aVertexPosition, 1.0);
	vColor = normalize( aVertexNormal / 2.0 + vec3(0.5) );	
}

//#fragment
void main(void) {
	gl_FragColor = vec4(vColor, 1.0);
}