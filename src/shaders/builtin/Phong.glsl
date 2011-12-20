//#name Phong
//#description Classic phong shader
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vTextureCoord = getTextureCoord(aTextureCoord);
    vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * vPosition;
    gl_PointSize = 5.0;
}

//#fragment
//#include Lights
uniform vec4 color;
uniform sampler2D colorTexture;
uniform bool hasColorTexture;
uniform float specularIntensity;
uniform float shininess;

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vec4 tc = color;
	if(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);	
	vec3 l = computeLights(vPosition, vNormal, specularIntensity, shininess);	
	gl_FragColor = vec4(tc.rgb * l, color.a);
}