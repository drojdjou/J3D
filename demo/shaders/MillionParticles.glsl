//#name MillionParticle

//#include CommonInclude
varying vec4 vColor;
varying float eyeDist;

//#vertex
//#include VertexInclude

void main(void) {
    vec4 worldPos = mMatrix * vec4(aVertexPosition, 1.0);

    vColor = aVertexColor;
    eyeDist = clamp( distance( uEyePosition, worldPos.xyz ) / 300.0, 0.0, 1.0);

    gl_Position = pMatrix * vMatrix * worldPos;
    gl_PointSize = 2.0 * (1.0 - eyeDist);
}

//#fragment
uniform vec4 uColor;

void main(void) {
    gl_FragColor = vec4( uColor.rgb * (1.0 - eyeDist) * vColor.rgb, 1.0 );
}