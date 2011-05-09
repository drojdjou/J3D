//# PhongVertex
varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vTextureCoord = aTextureCoord;	
    vNormal = uNMatrix * aVertexNormal;
	vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = projMat * vPosition;
}

//# PhongFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;
uniform bool uHasColorSampler;

uniform vec3 uAmbientColor;	
uniform float uSpecularIntensity;
uniform float uShininess;

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vec4 tc = uColor.rgba;
	if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);
	
	float lum = brightness(tc.rgb);
	vec3 l = uAmbientColor + computeLights(vPosition, vNormal, uSpecularIntensity, uShininess) * lum;
	
	gl_FragColor = vec4(tc.rgb * l, uColor.a);
}