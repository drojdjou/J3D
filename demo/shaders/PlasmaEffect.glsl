//#name PlasmaEffect
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {
    vec2 ca = vec2(0.1, 0.2);
    vec2 cb = vec2(0.7, 0.9);
    float da = distance(vTextureCoord, ca);
    float db = distance(vTextureCoord, cb);

    float t = uTime * 0.5;

    float c1 = sin(da * cos(t) * 16.0 + t * 4.0);
    float c2 = cos(vTextureCoord.y * 8.0 + t);
    float c3 = cos(db * 14.0) + sin(t);

    float p = (c1 + c2 + c3) / 3.0;

    gl_FragColor = texture2D(uTexture, vec2(p, p));
}