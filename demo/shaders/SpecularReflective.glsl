//#name SpecularReflective
//#author bartekd

//#include CommonInclude
varying vec2 vTexCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vObjectNormal;
varying vec3 refVec;
varying float vDir;

//#vertex
//#include VertexInclude

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);

	vNormal = normalize(nMatrix * aVertexNormal);
	vObjectNormal = aVertexNormal;

	vTexCoord = getTextureCoord(aTextureCoord);
	vec3 incident = normalize( vPosition.xyz - uEyePosition);
	refVec = reflect(incident, vNormal);
	vDir = (1.0 + dot(incident, vNormal)) / 2.0;
}

//#fragment
//#include Lights

uniform sampler2D uReflTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSpecTexture;

void main(void) {

    //vec3 c = texture2DNormal(uColorTexture, vObjectNormal).rgb;
    //vec3 s = texture2DNormal(uSpecTexture, vObjectNormal).rgb;

    vec3 c = texture2D(uColorTexture, vTexCoord).rgb;
    vec3 s = texture2D(uSpecTexture, vTexCoord).rgb;

	vec3 l = computeLights(vPosition, vNormal, s.r * 10.0, 20.0);
	vec3 il = vec3(1.0) - l;
	vec3 r = texture2DNormal(uReflTexture, refVec).rgb;

	gl_FragColor = vec4(( mix(c, r, s) * l) / 2.0, 1.0);
}