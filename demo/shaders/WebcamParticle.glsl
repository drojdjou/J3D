//#name WebcamParticle
//#include CommonFilterInclude

varying vec4 vColor;

//#vertex
attribute vec2 aParticle;
attribute vec2 aNormal;

uniform sampler2D uTexture;

void main(void) {
	vec2 p = aParticle;

	float m = (uTime * aNormal.x);
	m = mod(m, 1.0);
	m = m * 2.0 - 1.0;
	p.y -= m;
	
	vec2 tc = (p + vec2(1.0, 1.0)) * 0.5;
	tc.x = 1.0 - tc.x;
	vColor = texture2D(uTexture, tc);
	
	p.x += vColor.r * 0.1 - vColor.b * 0.1;
	p.y += vColor.b * 0.1 - vColor.r * 0.1;
	
	gl_Position = vec4(p, 0.0, 1.0);

	gl_PointSize = 2.0 + brightness(vColor.rgb);
}


//#fragment

void main(void) {
	gl_FragColor = vec4(0.0, 0.1 + vColor.g * 0.7, 0.0, 1.0);
	//gl_FragColor = vec4(1.0);
}
