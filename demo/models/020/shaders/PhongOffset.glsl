//#name Phong
//#description Classic phong shader
//#author bartekd

//#include CommonInclude
varying vec4 vPosition;
varying vec2 vTextureCoord;
varying vec3 vNormal;

//#vertex
//#include VertexInclude

uniform vec2 offset;

void main(void) {
	vTextureCoord = getTextureCoord(aTextureCoord);
    vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);

	vec4 p = (pMatrix * vMatrix * vPosition);
    gl_Position = p + vec4(offset.x * -p.w, offset.y * -p.w, 0.0, 0.0);
}

//#fragment
//#include Lights
uniform vec4 color;
uniform sampler2D colorTexture;
uniform bool hasColorTexture;
uniform float specularIntensity;
uniform float shininess;

void main(void) {
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	vec3 l = computeLights(vPosition, vNormal, specularIntensity, shininess);
	gl_FragColor = vec4(tc.rgb * l, tc.a);
	//gl_FragColor = vec4(1.0, 0.0, 0.0, tc.a);
}