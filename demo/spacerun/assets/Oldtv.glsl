//#name OldTv
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

uniform float windowHeight;
uniform float beat;

void main(void) {
    float w = windowHeight / 10.0;
    float b = fract( (vTextureCoord.y - uTime * 0.02) * w );
    b = abs(b - 0.5) * 2.0;

    vec2 vt = vTextureCoord - vec2(0.5);

    float d = distance(vec2(0.0), vt);

    float dr = 1.0 - d * 0.100 + d * 0.020 * beat;
    float dg = 1.0 - d * 0.125 + d * 0.025 * beat;
    float db = 1.0 - d * 0.150 + d * 0.030 * beat;

    b = step(b, 0.33);

    vec3 cr = texture2D( uTexture, vec2(0.5) + vt * dr ).rgb;
    vec3 cg = texture2D( uTexture, vec2(0.5) + vt * dg ).rgb;
    vec3 cb = texture2D( uTexture, vec2(0.5) + vt * db ).rgb;

    float n = whiteNoise(vTextureCoord * 0.1, 0.2);
    //float iy =  1.0 - vTextureCoord.y;
    //n *= iy * iy;

    vec3 c = vec3(cr.r, cg.g, cb.b);



    gl_FragColor = vec4(c * (1.0 - d) + (0.8 + b * 0.5) * n * (0.8 + d), 1.0);
}