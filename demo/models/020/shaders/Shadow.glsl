//#name Shadow
//#author bartekd
//#description A very basic shader that uses a color and/or a texture and no lights

//#include CommonInclude

//#vertex
//#include VertexInclude

varying vec2 vTextureCoord;

void main(void) {
    gl_Position = pMatrix * vMatrix * mMatrix * vec4(aVertexPosition, 1.0);
    gl_PointSize = 1.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
}

//#fragment
uniform sampler2D colorTexture;

varying vec2 vTextureCoord;
uniform float intensity;

void main(void) {
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	gl_FragColor = vec4(vec3(0.0), (1.0 - intensity) - tc.r);
}