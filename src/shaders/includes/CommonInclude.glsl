//#name CommonInclude
//#description Collection of common uniforms, functions and structs to include in shaders (both fragment and vertex)

precision mediump float;

uniform float uTime;
uniform mat4 mMatrix;
uniform mat4 vMatrix;
uniform mat3 nMatrix;
uniform mat4 pMatrix;
uniform vec3 uEyePosition;
uniform vec4 uTileOffset;
	
mat4 mvpMatrix() {
	return pMatrix * vMatrix * mMatrix;
}

mat4 mvMatrix() {
	return vMatrix * mMatrix;
}
	
float luminance(vec3 c) {
    return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
}
	
float brightness(vec3 c) {
    return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;
}

vec2 getTextureCoord(vec2 uv) {
	return uv * uTileOffset.xy + uTileOffset.zw;
}
