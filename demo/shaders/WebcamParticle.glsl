//#name WebcamParticle
//#include CommonFilterInclude

varying vec4 vColor;
varying vec2 vTextureCoord;
varying float vColumn;

//#vertex
attribute vec2 aParticle;
attribute vec2 aRandom;

uniform sampler2D uTexture;

void main(void) {
	vec2 p = aParticle;

	float m = uTime / 8.0 * aRandom.x + aRandom.x + (aParticle.y + 5.0) / 4.0;
	
	m = fract(m);
	
	vColumn = 1.0 - m;

	vec2 tc = (p + vec2(1.0, 1.0)) * 0.5;
	tc.x = 1.0 - tc.x;
	
	vColor = texture2D(uTexture, tc);

	vTextureCoord = tc;
	
	float d = 0.1;

	float xd = vColor.r;// - vColor.b;
	float yd = vColor.g;// - vColor.r;

	p.x += xd * d;
	p.y += yd * d;
	
	gl_Position = vec4(p, 0.0, 1.0);

	gl_PointSize = 12.0;
}


//#fragment

uniform sampler2D matrixTexture;

void main(void) {
	float gc = (vColor.r + vColor.g + vColor.b) * 0.33;
	float gk = smoothstep(0.9, 1.0, vColumn) * gc;
	
	//float pl = (sin(uTime + vColor.r * 3.0)+1.0) * 8.0;
	float pl = 16.0 - (gc * 16.0);
	//float pl = (sin(uTime + 3.0)+1.0) * 8.0;
	
	float rl = floor(mod(pl, 4.0)) / 4.0 + gl_PointCoord.x * 0.25;
	float cl = floor(pl / 4.0) / 4.0 + gl_PointCoord.y * 0.25;

	vec4 tc = texture2D(matrixTexture, vec2(rl, cl));

	gl_FragColor = vec4(gk, (gk + gc) * vColumn * 1.2, gk, tc.r);
}
