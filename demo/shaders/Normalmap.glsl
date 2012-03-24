//#name Normalmap
//#author bartekd

//#include CommonInclude

varying vec3 vColor;
varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTexCoord;
varying vec3 vNormal;

//#vertex
//#include VertexInclude

attribute vec4 aVertexTangent;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vColor = normalize( aVertexTangent.xyz / 2.0 + vec3(0.5) );
	vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);
	vTexCoord = aTextureCoord;
}

//#fragment
//#include Lights

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform sampler2D specMap;

uniform float shininess;

void main(void) {
    float si = texture2D(specMap, vTexCoord).r;
    vec3 l = computeLights(vPosition, vNormal, si, shininess);
	vec3 c = texture2D(colorMap, vTexCoord).rgb;
	gl_FragColor = vec4(c * l, 1.0);
}