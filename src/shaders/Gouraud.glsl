//# GouraudVertex
uniform vec3 uAmbientColor;
uniform lightSource uLight[4];
uniform float uSpecularIntensity;
uniform float uShininess;
	
varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 p = uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = projMat * p;
	
 	vTextureCoord = aTextureCoord;
	
    vec3 n = normalize( uNMatrix * aVertexNormal );
	vLight = uAmbientColor;
	
	vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[0]);
	vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[1]);
	vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[2]);
	vLight += computeLight(p, n, uSpecularIntensity, uShininess, uLight[3]);
}

//# GouraudFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;
uniform bool uHasColorSampler;

varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = uColor.rgba;
	if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);
	gl_FragColor = vec4(tc.rgb * vLight, uColor.a);
}