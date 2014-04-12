//#name ReflectiveSphere
//#description Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html
//#author bartekd

//#include CommonInclude

varying vec3 vRefNormal;
varying vec3 vNormal;
varying vec3 vEyeDirection;


//#vertex
//#include VertexInclude

void main(void) {
	vec3 p = (mMatrix * vec4(aVertexPosition, 1.0)).xyz;

	gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);

	vNormal = normalize(nMatrix * aVertexNormal);
	vEyeDirection = normalize(uEyePosition - p);
	vRefNormal = reflect(-vEyeDirection, vNormal);
}

//#fragment
uniform sampler2D uTexture;

const vec3 uLight = vec3(0.0, 1.0, 0.0);
const float uShininess = 128.0;
const float uSpecularIntensity = 32.0;

vec2 normalToUv(vec3 n) {
	vec3 xy = vec3(n.x, n.y, 0);
	vec3 xz = vec3(n.x, 0, n.z);

	vec3 up = vec3(0, 1, 0);
	vec3 left = vec3(1, 0, 0);

	float tx = dot(xy, up) * 0.5 + 0.5;
	float ty = dot(xz, left) * 0.5 + 0.5;

	return vec2(ty, tx);
}

void main(void) {

	vec2 ref = normalToUv(vRefNormal);

	float diffuse = (dot(vNormal, uLight) * 0.5 + 0.5);

    vec3 refd = reflect(-uLight, vNormal);
    float spec = pow(max(dot(vEyeDirection, refd), 0.0), uShininess) * uSpecularIntensity;

	vec3 refCol = texture2D(uTexture, ref).rgb;
	float lum = luminance(refCol);
	lum = pow(lum, 3.0);
	refCol *= 2.0 * lum;
	vec3 color = vec3(0.4, 0.0, 0.0);

	vec3 mc = mix(color, refCol, lum);

	gl_FragColor = vec4(mc * diffuse, 1.0);
}