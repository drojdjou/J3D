//#name DizzyFilter
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {

    float m1 = sin(uTime * 2.0 + vTextureCoord.y * 6.0) * cos(uTime * -1.0 + vTextureCoord.x * 4.0) * 0.03;

    vec4 a = texture2D(uTexture, vTextureCoord + m1 * 0.5);
    vec4 b = texture2D(uTexture, vTextureCoord + m1);
    vec4 c = texture2D(uTexture, vTextureCoord + m1 * 1.5);

    float n = 1.0;//whiteNoise(vTextureCoord, 4.0);

    vec3 cl = vec3(a.r, b.g, c.b) * n;

    gl_FragColor = vec4(cl, 1.0);

}