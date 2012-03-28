//#name Normalmap
//#author bartekd

//#include CommonInclude
//#include Lights

varying vec3 vColor;
varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTexCoord;
varying vec3 vNormal;

varying vec3 snLightDir;
varying vec3 snEyeDir;

//#vertex
//#include VertexInclude

attribute vec4 aVertexTangent;

void main(void) {

	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	
	vColor = normalize( aVertexTangent.xyz / 2.0 + vec3(0.5) );
	vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);
	vTexCoord = aTextureCoord;

	vec3 n = normalize(nMatrix * aVertexNormal);
	vec3 t = normalize(nMatrix * aVertexTangent.xyz);
	vec3 b = cross(n, t);

	vec3 v;
	
	v.x = dot(-uLight[1].direction, t);
	v.y = dot(-uLight[1].direction, b);
	v.z = dot(-uLight[1].direction, n);
	snLightDir = v;

	v.x = dot(uEyePosition, t);
	v.y = dot(uEyePosition, b);
	v.z = dot(uEyePosition, n);
	snEyeDir = v;

}

//#fragment

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform sampler2D specMap;

uniform float bumpDensity;
uniform float bumpSize;

uniform float shininess;

void main(void) {

    vec2 ci = bumpDensity * vTexCoord;
    vec2 p = fract(ci) - vec2(0.5);

    float d, f;
    d = dot(p,p);
    f = inversesqrt(d + 1.0);

    if(d >= bumpSize) {
        p = vec2(0,0);
        f = 1.0;
    }

    vec3 normDelta = vec3(p.x, p.y, 1.0) * f;

    float si = 6.0;//texture2D(specMap, vTexCoord).r;
    float b = max(dot(normDelta, snLightDir), 0.0);
    vec3 l = computeLights(vPosition, vNormal * b, si, shininess);
	vec3 c = texture2D(colorMap, vTexCoord).rgb;


	gl_FragColor = vec4(c * l + c * b, 1.0);
}














