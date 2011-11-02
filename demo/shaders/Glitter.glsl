//#name Glitter
//#author bartekd

//#include CommonInclude

//#vertex
//#include VertexInclude
//#include Lights
varying float vLight;
varying vec2 vTextureCoord;
varying float vTime;
varying float vDirection;

void main(void) {
	vec4 p = mMatrix * (vec4(aVertexPosition, 1.0));
	vec4 vp =  vMatrix * p;
	vDirection = dot(normalize(nMatrix * aVertexNormal), vec3(0,0,-1));
    gl_Position = pMatrix * vp;
    gl_PointSize = 10.0;
 	vTextureCoord = getTextureCoord(aTextureCoord);
    vec3 n = normalize( nMatrix * aVertexNormal );
	vLight = computeLights(p, n, 0.0, 0.0).r;
	vTime = (sin(uTime * 2.0 + aVertexNormal.x +  aTextureCoord.y) + 1.0);
}

//#fragment
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