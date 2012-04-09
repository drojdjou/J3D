//#name VideoEffect
//#include CommonFilterInclude

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform vec2 mousePos;

varying vec2 vTextureCoord;
varying float bar;
varying float time;

void main(void) {
	gl_Position = vec4(aVertexPosition, 0.0, 1.0);
	
	bar = (uTime + aVertexPosition.y) * 3.0;

	vTextureCoord = aTextureCoord;
	
	time = uTime;
}


//#fragment
uniform sampler2D uTexture;
uniform vec3 colorOffset;
uniform vec2 mousePos;
uniform float noiseScale;

varying float time;
varying vec2 vTextureCoord;
varying float bar;

void main(void) {
	float b = fract(bar);
	b = (b > 0.5) ? 0.0 : 1.0;
	
	vec2 tc = vTextureCoord;
	tc.x += sin(tc.y * 3.14 + time * 2.0) * sin(tc.y * 31.4 + time * 4.0) * 0.004 * mousePos.y;

	vec2 rtc = tc;
	rtc.x += colorOffset.r;
	
	vec2 gtc = tc;
	gtc.x += colorOffset.g;
	
	vec2 btc = tc;
	btc.x += colorOffset.b;

	vec4 cr = texture2D(uTexture, rtc);
	vec4 cg = texture2D(uTexture, gtc);
	vec4 cb = texture2D(uTexture, btc);
	
	float ns = 0.1 + 0.25 * abs(mousePos.x * mousePos.y);
	float n = whiteNoise(vTextureCoord, ns);
	
	vec3 c = mix(vec3(cr.r, cg.g, cb.b), vec3(b), mousePos.x * 0.05);
	float l = brightness(c);
	c = mix(c, vec3(l), mousePos.y);
	//vec3 c = vec3(b);

	gl_FragColor = vec4(c + vec3(n), 1.0);
}
