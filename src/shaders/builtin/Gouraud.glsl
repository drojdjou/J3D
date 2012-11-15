//#name Gouraud
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
//#include Lights
uniform float specularIntensity;
uniform float shininess;
	
varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 p = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * p;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = nMatrix * aVertexNormal;
	vLight = computeLights(p, n, specularIntensity, shininess);
}

//#fragment
uniform vec4 color;
uniform vec3 emissive;
uniform sampler2D colorTexture;

varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	vec3 fc = (color.rgb + tc.rgb) * vLight + emissive.rgb;
	gl_FragColor = vec4(fc, clamp(tc.a, 0.0, 1.0));
}