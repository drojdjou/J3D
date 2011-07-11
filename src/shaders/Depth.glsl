//# DepthVertex
varying float depth;

void main(void) {
	vec4 p = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * p;
	depth = gl_Position.z/gl_Position.w;
}

//# DepthFragment
varying float depth;

void main(void) {
	float d = 1.0 - depth;
	gl_FragColor = vec4(d, d, d, 1.0);
}