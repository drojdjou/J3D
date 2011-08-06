//# GlitterVertex
varying float vLight;
varying vec2 vTextureCoord;
varying float vTime;
varying float vDirection;


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
	vec4 p = mMatrix * (vec4(aVertexPosition, 1.0));
	vec4 vp =  vMatrix * p;
	vDirection = dot(normalize(nMatrix * aVertexNormal), vec3(0,0,-1));
    gl_Position = pMatrix * vp;
    gl_PointSize = 10.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = lightIntensity(p, n);
	vTime = (sin(uTime * 2.0 + aVertexNormal.x +  aTextureCoord.y) + 1.0);
}

//# GlitterFragment
uniform sampler2D uColorSampler;
uniform sampler2D uParticle;

varying float vLight;
varying vec2 vTextureCoord;
varying float vTime;
varying float vDirection;

void main(void) {
	vec4 tc = texture2D(uColorSampler, vec2(vLight + uTime * 0.1, uTime) );
	vec4 pc = texture2D(uParticle, gl_PointCoord);
	
	if(vDirection > 0.0) {
		discard;
	} else {
		gl_FragColor = vec4(tc.rgb * 0.5, pc.r * 0.4);
	}
}