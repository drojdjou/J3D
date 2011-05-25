//# LightmapVertex
uniform vec4 uLightmapAtlas;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

void main(void) {
	vTextureCoord = getTextureCoord(aTextureCoord);	
	vTextureCoord2 = aTextureCoord2 * uLightmapAtlas.xy + uLightmapAtlas.zw;	
	
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
}

//# LightmapFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;
uniform sampler2D uLightmapSampler;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

void main(void) {
	
	vec4 tc = texture2D(uColorSampler, vTextureCoord);
	vec4 lm = texture2D(uLightmapSampler, vTextureCoord2);

	if(tc.a < 0.1) discard;
	else gl_FragColor = vec4(uColor.rgb * tc.rgb * lm.rgb, 1.0);
}