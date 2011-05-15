//# ParticleVertex
varying vec4 vColor;
varying float eyeDist;

void main(void) {
	vec4 worldPos = mMatrix * vec4(aVertexPosition, 1.0);
	
	vColor = aVertexColor;
	eyeDist = clamp( distance( uEyePosition, worldPos.xyz ) / 300.0, 0.0, 1.0);
	
	gl_Position = pMatrix * vMatrix * worldPos;
	gl_PointSize = 2.0 * (1.0 - eyeDist);
}

//# ParticleFragment
uniform vec4 uColor;

varying vec4 vColor;
varying float eyeDist;

void main(void) {
	gl_FragColor = vec4( vColor.rgb * (1.0 - eyeDist), 1.0 );
}