//# PhongVertex
uniform vec3 uAmbientColor;	

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	 vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = projMat * vPosition;
	
 	 vTextureCoord = aTextureCoord;
	
    vNormal = uNMatrix * aVertexNormal;
    vLight = uAmbientColor;
}

//# PhongFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;
uniform bool uHasColorSampler;
uniform lightSource uLight[4];
uniform float uSpecularIntensity;
uniform float uShininess;

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vec4 tc = uColor.rgba;
	if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);
	
	vec3 l = vLight;
	float lum = brightness(tc.rgb);
	l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[0]) * lum;
	l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[1]) * lum;
	l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[2]) * lum;
	l += computeLight(vPosition, vNormal, uSpecularIntensity, uShininess, uLight[3]) * lum;
	
	gl_FragColor = vec4(tc.rgb * l, uColor.a);
}