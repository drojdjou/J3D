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
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = computeLights(p, n, specularIntensity, shininess);
}

//#fragment
uniform vec4 color;
uniform vec4 emissive;
uniform sampler2D colorTexture;
uniform bool hasColorTexture;

varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = color;
	if(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);
	gl_FragColor = vec4(tc.rgb * vLight + emissive.rgb, tc.a);
}