//# CommonInclude
#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;

uniform mat4 mMatrix;
uniform mat4 vMatrix;
uniform mat3 nMatrix;
uniform mat4 pMatrix;
uniform vec3 uEyePosition;

mat4 mvpMatrix() {
	return pMatrix * vMatrix * mMatrix;
}

mat4 mvMatrix() {
	return vMatrix * mMatrix;
}

struct lightSource {
	int type;
	vec3 direction;
	vec3 color;
	vec3 position;
};

uniform lightSource uLight[4];
uniform vec3 uAmbientColor;

uniform vec4 uTileOffset;
	
float luminance(vec3 c) {
    return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
}
	
float brightness(vec3 c) {
    return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;
}

vec3 computeLight(vec4 p, vec3 n, float si, float sh, lightSource light){
    vec3 ld;
    
    if(light.type == 0) return vec3(0);
    else if(light.type == 1) ld = -light.direction;
    else if(light.type == 2) ld = normalize(light.position - p.xyz);
    
    float dif = max(dot(n, ld), 0.0);
	
    float spec = 0.0;
    
    if(si > 0.0) {
    	vec3 eyed = normalize(uEyePosition - p.xyz);
    	vec3 refd = reflect(-ld, n);
    	spec = pow(max(dot(refd, eyed), 0.0), sh) * si;
    };
	
    return uAmbientColor + light.color * dif + light.color * spec;
}

vec3 computeLights(vec4 p, vec3 n, float si, float sh) {
	vec3 s = computeLight(p, n, si, sh, uLight[0]);
	s += computeLight(p, n, si, sh, uLight[1]);
	s += computeLight(p, n, si, sh, uLight[2]);
	s += computeLight(p, n, si, sh, uLight[3]);
	return s;
}

vec2 getTextureCoord(vec2 uv) {
	return uv * uTileOffset.xy + uTileOffset.zw;
}
