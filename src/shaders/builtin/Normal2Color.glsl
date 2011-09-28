//#name Normal2Color
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
varying vec3 vColor;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vColor = normalize( aVertexNormal / 2.0 + vec3(0.5) );	
}

//#fragment
varying vec3 vColor;

void main(void) {
	gl_FragColor = vec4(vColor, 1.0);
}