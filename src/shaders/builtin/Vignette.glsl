//#name Vignette
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex
 
//#fragment
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {
	vec2 m = vec2(0.5, 0.5);
	float d = distance(m, vTextureCoord) * 1.0;
	vec3 c = texture2D(uTexture, vTextureCoord).rgb * (1.0 - d * d);
	gl_FragColor = vec4(c.rgb, 1.0);
}