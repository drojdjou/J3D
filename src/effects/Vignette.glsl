//# VignetteEffect
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {
	vec2 m = vec2(0.5, 0.5);
	float d = distance(m, vTextureCoord) * 1.0;
	gl_FragColor = texture2D(uTexture, vTextureCoord) * (1.0 - d * d);
}