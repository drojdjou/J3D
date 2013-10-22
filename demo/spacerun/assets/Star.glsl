//#name Star
//#include CommonInclude
varying float py;

//#vertex
//#include VertexInclude
uniform float bound;
uniform float offset;

void main(void) {
    vec3 p = aVertexPosition;
    py = abs(p.y);
    p.z += offset;
    p.z = -bound + mod(p.z, bound * 2.0);
    gl_Position = pMatrix * vMatrix * mMatrix * vec4(p, 1.0);
    gl_PointSize = 2.0;
}

//#fragment
uniform vec4 color;
uniform float yspan;

void main(void) {
    vec3 c = color.rgb * (1.2 - py/yspan);
	gl_FragColor = vec4(c * 0.4, 1.0);
}