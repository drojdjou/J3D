//# PhongVertex
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

//# PhongFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;
uniform bool uHasColorSampler;

uniform float uSpecularIntensity;
uniform float uShininess;

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
	vec4 tc = uColor;
	if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);
	
	vec3 l = computeLights(vPosition, vNormal, uSpecularIntensity, uShininess);// * brightness(tc.rgb);
	
	gl_FragColor = vec4(tc.rgb * l, uColor.a);
}