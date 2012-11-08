//#name NoiseEffect
//#include CommonFilterInclude

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main(void) {
	gl_Position = vec4(aVertexPosition, 0.0, 1.0);
	vTextureCoord = aTextureCoord;
}


//#fragment
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {
	vec4 c = texture2D(uTexture, vTextureCoord);
	float n = whiteNoise(vTextureCoord, 0.12);

	gl_FragColor = vec4(c.rgb + vec3(n) * c.a, c.a);
}
