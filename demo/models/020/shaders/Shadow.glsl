//#name Shadow
//#author bartekd
//#description A very basic shader that uses a color and/or a texture and no lights

//#include CommonInclude

//#vertex
//#include VertexInclude

varying vec2 vTextureCoord;
uniform vec2 offset;

void main(void) {
 	vTextureCoord = getTextureCoord(aTextureCoord);
 	vec4 p = (pMatrix * vMatrix * mMatrix * vec4(aVertexPosition, 1.0));
    gl_Position = p + vec4(offset.x * -p.w, offset.y * -p.w, 0.0, 0.0);
}

//#fragment
uniform sampler2D colorTexture;

varying vec2 vTextureCoord;
uniform float intensity;

void main(void) {
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	gl_FragColor = vec4(vec3(0.0, 0.05, 0.1), max(0.0, (0.9 - intensity) * (1.0 - tc.r)));
}