//#name MagnetRing
//#include CommonInclude
varying float i;
varying float r;

//#vertex
//#include VertexInclude
attribute float aVertexIndex;

uniform float numParticles;
uniform float radius;
uniform float pointSize;

void main(void) {
    float PI2 = 6.28318531;
    i = aVertexIndex / numParticles;

    r = radius;

    float a = uTime + i * PI2 ;
    float x = cos(a) * r;
    float z = sin(a) * r;

    float ri = smoothstep(0.6, 1.6, abs(r));
    float ro = 1.0 - smoothstep(1.6, 3.0, abs(r));

    r = ri * ro;

    gl_Position = pMatrix * vMatrix * mMatrix * vec4(x, 0.0, z, 1.0);
    gl_PointSize = pointSize;
}

//#fragment
uniform sampler2D uParticle;

void main(void) {


    vec2 p = gl_PointCoord;

    p.x = p.x - 0.5;
    p.y = p.y - 0.5;

    vec2 pp = vec2(0);

    float s = uTime * -4.0;

    pp.x = p.x * cos(s) - p.y * sin(s);
    pp.y = p.x * sin(s) + p.y * cos(s);

    pp.x += 0.5;
    pp.y += 0.5;

    vec4 c = texture2D(uParticle, pp);
    gl_FragColor = vec4(c.rgb, brightness(c.rgb) * r);
}