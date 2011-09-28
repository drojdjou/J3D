//# LightmapVertex
uniform vec4 lightmapAtlas;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

void main(void) {
	vTextureCoord = getTextureCoord(aTextureCoord);	
	vTextureCoord2 = aTextureCoord2 * lightmapAtlas.xy + lightmapAtlas.zw;	
	
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
}

//# LightmapFragment
uniform vec4 color;
uniform sampler2D colorTexture;
uniform sampler2D lightmapTexture;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

void main(void) {
	
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	vec4 lm = texture2D(lightmapTexture, vTextureCoord2);

	if(tc.a < 0.1) discard;
	else gl_FragColor = vec4(color.rgb * tc.rgb * lm.rgb, 1.0);
}