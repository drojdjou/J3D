//#name Selflit
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
uniform vec4 color;
uniform sampler2D colorTexture;
uniform bool hasColorTexture;

varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = color;
	if(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);
	gl_FragColor = vec4(tc.rgb, color.a);
}