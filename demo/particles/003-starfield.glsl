//#name MillionParticle

//#include CommonInclude
varying vec3 vp;

//#vertex
//#include VertexInclude
uniform float uSize;
uniform vec3 uSpeed;

void main(void) {
	vec3 p = aVertexPosition;

	p = mod(p + uSpeed, 1.0);

    vec4 worldPos = mMatrix * vec4(p * uSize * 2.0 - uSize, 1.0);

    gl_Position = pMatrix * vMatrix * worldPos;
    gl_PointSize = 2.0;

    vp = p;
}

//#fragment

void main(void) {
	vec3 p = vp;
	p = p * 2.0;
	p = p - vec3(1.0); 
	float c = 1.0 - length(p);
    gl_FragColor = vec4(c, c, c, c);
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}