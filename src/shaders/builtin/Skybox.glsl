
//#vertex
//#include VertexInclude
precision mediump float;
precision highp int;

attribute vec3 aVertexPosition;
// attribute vec3 aVertexNormal;
// attribute vec2 aTextureCoord;

varying vec3 vPosition;

void main(void) {
	gl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition, 1.0);
	vPosition = aVertexPosition;	
}

//#fragment
precision mediump float;
precision highp int;

uniform samplerCube uCubemap;

varying vec3 vPosition;

void main(void) {
	gl_FragColor = textureCube(uCubemap, vPosition);
}