//#name Lightmap
//#author bartekd

//#include CommonInclude
varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;
varying vec4 vPosition;
varying vec3 vNormal;

//#vertex
//#include VertexInclude
uniform vec4 lightmapAtlas;

void main(void) {

	vTextureCoord = getTextureCoord(aTextureCoord);	
	vTextureCoord2 = aTextureCoord2 * lightmapAtlas.xy + lightmapAtlas.zw;

    vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * vPosition;
    gl_PointSize = 5.0;
}

//#fragment
//#include Lights
uniform vec4 color;
uniform sampler2D colorTexture;
uniform sampler2D lightmapTexture;
uniform float specularIntensity;
uniform float shininess;

void main(void) {
	
	vec4 tc = texture2D(colorTexture, vTextureCoord);
	vec4 lm = texture2D(lightmapTexture, vTextureCoord2);

    float si = specularIntensity * tc.r;

    vec3 ltc = computeLights(vPosition, vNormal, si, shininess);
    vec3 lmc = lm.rgb * lm.a;

	if(tc.a < 0.1) discard;
	else gl_FragColor = vec4(color.rgb * tc.rgb * (ltc + lmc), 1.0);
}