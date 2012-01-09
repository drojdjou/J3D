//#name Terrain
//#author bartekd

//#include CommonInclude

varying vec4 vPosition;
varying vec2 vTextureCoord;
varying vec3 vNormal;
varying float groundLevel;

//#vertex
//#include VertexInclude

uniform vec2 heightLimits;
uniform float heightMultiplier;

void main(void) {

	vTextureCoord = getTextureCoord(aTextureCoord);

	vec4 vp = vec4(aVertexPosition, 1.0);

	groundLevel = (vp.y - heightLimits.x) / (heightLimits.y - heightLimits.x);

    vNormal = nMatrix * aVertexNormal;
	vPosition = mMatrix * vp;
    gl_Position = pMatrix * vMatrix * vPosition;
}

//#fragment
//#include Lights

uniform float beachLimit;
uniform float beachSmoothness;

uniform float rockLimit;
uniform float rockSmoothness;

uniform sampler2D beachTex;
uniform sampler2D grassTex;
uniform sampler2D rockTex;


vec4 getComponent(vec4 c, float min, float max, float t) {
    float sm = beachSmoothness;
    return c * smoothstep(min-sm, min+sm, t) * (1.0 - smoothstep(max-sm, max+sm, t));
}

void main(void) {

    vec4 beachColor = texture2D(beachTex, vTextureCoord);
    vec4 grassColor = texture2D(grassTex, vTextureCoord);
    vec4 rockColor =  texture2D(rockTex,  vTextureCoord);

    vec4 tc = getComponent(beachColor, 0.0, beachLimit, groundLevel);
    tc += getComponent(grassColor,     beachLimit, 1.0, groundLevel);

    float st = dot(vec3(0,1,0), vNormal);
    st = smoothstep(rockLimit, rockLimit + rockSmoothness, st);
    tc = mix(rockColor, tc, st);

	vec3 l = computeLights(vPosition, vNormal, 0.0, 32.0) * 1.8;
	gl_FragColor = vec4(tc.rgb * l, 1.0);
	
}









