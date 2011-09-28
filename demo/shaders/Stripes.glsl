//#name Stripes
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vPosition;

void main(void) {
	vec4 p = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * p;
    gl_PointSize = 10.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = computeLights(p, n, 6.0, 8.0);
	vPosition = p.xyz;
}

//#fragment
uniform sampler2D uColorSampler;

varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vPosition;

void main(void) {
	vec4 tc = texture2D(uColorSampler, vec2(min(brightness(vLight), 1.0), 0.5) );
	gl_FragColor = vec4(tc.rgb * vLight, 1.0);
}