//# DispersionFragment
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {

	float m1 = 0.002;
		
	vec4 a = texture2D(uTexture, vTextureCoord + m1);
	vec4 b = texture2D(uTexture, vTextureCoord);
	vec4 c = texture2D(uTexture, vTextureCoord - m1);

	gl_FragColor = vec4(a.r, b.g, c.b, 1.0);
		
}