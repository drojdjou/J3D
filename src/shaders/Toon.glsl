//# ToonVertex
varying float vLight;
varying vec2 vTextureCoord;

float cli(vec4 p, vec3 n, lightSource light){
    vec3 ld;
    if(light.type == 0) return 0.0;
    else if(light.type == 1) ld = -light.direction;
    else if(light.type == 2) ld = normalize(light.position - p.xyz);
    return max(dot(n, ld), 0.0);
}

float lightIntensity(vec4 p, vec3 n) {
	float s = cli(p, n, uLight[0]);
	s += cli(p, n, uLight[1]);
	s += cli(p, n, uLight[2]);
	s += cli(p, n, uLight[3]);
	return s;
}

void main(void) {
	vec4 p = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * p;
    gl_PointSize = 10.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = lightIntensity(p, n);
}

//# ToonFragment
uniform vec4 uColor;
uniform sampler2D uColorSampler;

varying float vLight;
varying vec2 vTextureCoord;

void main(void) {
	vec4 tc = texture2D(uColorSampler, vec2(vLight, 0.5) );
	gl_FragColor = vec4(tc.rgb, 1.0);
}