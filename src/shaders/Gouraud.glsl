//# GouraudVertex
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

//# GouraudFragment
uniform vec4 color;
uniform sampler2D colorTexture;
uniform bool hasColorTexture;

varying vec3 vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = color;
	if(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);
	gl_FragColor = vec4(tc.rgb * vLight, color.a);
}