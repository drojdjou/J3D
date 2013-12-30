//#name MillionParticle

//#include CommonInclude
varying vec4 vColor;
varying float eyeDist;
varying vec3 vPos;

//#vertex
//#include VertexInclude
attribute vec3 aVertexData;

void main(void) {


	vec3 locPos = aVertexData;

	locPos.y += sin(uTime * 6.0 + locPos.x * 0.1) * sin(uTime * 2.7 + locPos.x * 0.05) * (70.0-abs(locPos.x))/3.0;
	locPos.y += cos(uTime * 1.3 + locPos.z * 0.2) * sin(uTime * 4.0 + locPos.x * 0.02) * (70.0-abs(locPos.z))/4.0;
    vec4 worldPos = mMatrix * vec4(locPos, 1.0);

    vColor = aVertexColor;
    vPos = locPos;
    eyeDist = clamp( distance( uEyePosition, worldPos.xyz ) / 300.0, 0.0, 1.0);

    gl_Position = pMatrix * vMatrix * worldPos;
    gl_PointSize = 3.0 * (1.0 - eyeDist);
}

//#fragment
uniform vec4 uColor;

void main(void) {
    gl_FragColor = vec4( uColor.rgb * (1.0 - eyeDist) * vColor.rgb, 1.0 );
    // gl_FragColor = vec4(vPos.y * uColor.rgb, 1.0 );
}