//#name EarthShader
//#include CommonInclude
//#include Lights

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 lightVec;
varying vec3 eyeVec;

//#vertex
//#include VertexInclude

attribute vec4 aVertexTangent;

void main(void) {
    vTextureCoord = getTextureCoord(aTextureCoord);
    vNormal = nMatrix * aVertexNormal;
    vPosition = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * vPosition;

    /*
    vec3 n = normalize(nMatrix * aVertexNormal);
    vec3 t;
	vec3 b;

	vec3 c1 = cross(n, vec3(0.0, 0.0, 1.0));
	vec3 c2 = cross(n, vec3(1.0, 0.0, 0.0));

	if(length(c1) > length(c2)) {
		t = c1;
	} else {
		t = c2;
	}

	t = normalize(t);

	b = cross(n, t);
	b = normalize(b);
	*/

	vec3 n = normalize(nMatrix * aVertexNormal);
	vec3 t = normalize(nMatrix * aVertexTangent.xyz);
	vec3 b = cross(n, t) * aVertexTangent.w;

	vec3 v;

	v.x = dot(uLight[0].position, t);
	v.y = dot(uLight[0].position, b);
	v.z = dot(uLight[0].position, n);
	lightVec = normalize(v);

	v.x = dot(uEyePosition, t);
	v.y = dot(uEyePosition, b);
	v.z = dot(uEyePosition, n);
	eyeVec = normalize(v);
}

//#fragment

uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D specularMap;
uniform sampler2D normalMap;

uniform float specularIntensity;
uniform float shininess;

void main(void) {

    vec3 day = texture2D(dayTexture, vTextureCoord).rgb;
    vec3 night = texture2D(nightTexture, vTextureCoord).rgb;
    vec3 specMap = texture2D(specularMap, vTextureCoord).rgb;

    lightSource ls = uLight[0];
	vec3 bump = normalize( texture2D(normalMap, vTextureCoord).xyz * 2.0 - 1.0);

    float dif = dot(lightVec, bump);
    dif = smoothstep(-ls.angleFalloff, ls.angleFalloff, dif);

    float s = max(0.0, dot(reflect(-lightVec, bump), eyeVec));
	float spec = (0.5 + specMap.r) * pow( s, shininess) * specularIntensity;
	
	gl_FragColor = vec4(mix(night, day, dif) + spec * day, 1.0);

}






















