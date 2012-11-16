//#name SlideshowTransitionEffect

//#include CommonFilterInclude
varying vec2 vTextureCoord;

uniform float delta;
uniform float wDelta;

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

void main(void) {
	gl_Position = vec4(aVertexPosition, 0.0, 1.0);
	vTextureCoord = aTextureCoord;
}


//#fragment
uniform sampler2D uTextureIn;
uniform sampler2D uTextureOut;

#define COLOR_OFFSET 0.03
#define NUM_SCANLINES 80.0

#define NOISE_VALUE whiteNoise(vTextureCoord * 0.1, wDelta)
//# define NOISE_VALUE 0.0

const vec2 photoIplStep = vec2(0.5, 0.55);

float photoIpl;
float forceDistortIpl;
float offsetIpl;
float colorIpl;

void main(void) {
    photoIpl = smoothstep(photoIplStep.x, photoIplStep.y, delta);
    forceDistortIpl = smoothstep(0.6, 1.0, wDelta) * 0.1 * (1.0 - vTextureCoord.y);
    offsetIpl = smoothstep(0.3, 0.7, sin(wDelta)) * (-0.01 - 0.01 * vTextureCoord.x * vTextureCoord.x);
    colorIpl = smoothstep(0.55, 1.0, wDelta) * COLOR_OFFSET;

    float offsetY = mod(vTextureCoord.y + offsetIpl, 1.0);
    float offsetX = vTextureCoord.x + tan(uTime * 0.2 + vTextureCoord.y * 6.0) * forceDistortIpl;
    vec2 tc = vec2(offsetX, offsetY);

    float scanLine = (uTime * 0.2 + vTextureCoord.y) * NUM_SCANLINES;
	scanLine = fract(scanLine);
	scanLine = step(0.5, scanLine) * 0.35 * smoothstep(0.6, 1.0, wDelta);

    vec2 colorIplV = vec2(colorIpl, 0.0);

    float cInR = texture2D(uTextureIn, tc).r;
    float cOutR = texture2D(uTextureOut, tc).r;

    float cInG = texture2D(uTextureIn, tc + colorIplV).g;
    float cOutG = texture2D(uTextureOut, tc + colorIplV).g;

    float cInB = texture2D(uTextureIn, tc - colorIplV).b;
    float cOutB = texture2D(uTextureOut, tc - colorIplV).b;

    vec3 cIn = vec3(cInR * (1.0 - delta), cInG, cInB);
    vec3 cOut = vec3(cOutR, cOutG, cOutB * delta);

    vec3 photo = mix(cIn, cOut, photoIpl);

	gl_FragColor = vec4(photo + vec3(NOISE_VALUE) + vec3(scanLine), 1.0);
}
