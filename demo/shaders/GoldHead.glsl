//# GoldHeadVertex
varying vec2 vTexCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 refVec;
varying float vDir;

void main(void) {
	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);
	vPosition = mMatrix * vec4(aVertexPosition, 1.0);
	vNormal = normalize(nMatrix * aVertexNormal);	
	vTexCoord = aTextureCoord;
	vec3 incident = normalize( vPosition.xyz - uEyePosition);
	refVec = reflect(incident, vNormal);	
	vDir = (1.0 + dot(incident, vNormal)) / 2.0;
}

//# GoldHeadFragment
uniform samplerCube uCubemap;
uniform sampler2D uColorTexture;

varying vec2 vTexCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 refVec;
varying float vDir;

void main(void) {
	vec3 l = computeLights(vPosition, vNormal, 10.0, 20.0);
	vec3 il = vec3(1.0) - l;
	vec3 r = textureCube(uCubemap, refVec).rgb;
	vec3 c = texture2D(uColorTexture, vTexCoord).rgb;
	gl_FragColor = vec4((c + r * l) / 2.0, 1.0);
}