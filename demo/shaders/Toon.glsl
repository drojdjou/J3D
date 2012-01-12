//#name Toon
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
//#include Lights
varying float vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 p = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * p;
    gl_PointSize = 10.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = computeLights(p, n, 0.0, 0.0).r;
}

//#fragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;

varying float vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = texture2D(uColorSampler, vec2(vLight, 0.5) );
	gl_FragColor = vec4(tc.rgb, 1.0);
}








