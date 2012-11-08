//#name NormalPlasmaEffect
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {

    vec2 ca = vec2(0.25, 0.25);
    vec2 cb = vec2(0.25, 0.75);
    vec2 cc = vec2(0.75, 0.25);
    vec2 cd = vec2(0.75, 0.75);

    float da = distance(vTextureCoord, ca) * 2.0;
    float db = distance(vTextureCoord, cb) * 2.0;
    float dc = distance(vTextureCoord, cc) * 3.0;
    float dd = distance(vTextureCoord, cd) * 4.0;

    float t = uTime * 0.5;

    float c1 = sin(da * cos(t) / 16.0 + t / 40.0);
    float c2 = cos(vTextureCoord.y * 5.0 + t * 4.0);
    float c3 = cos(db * 13.0) + sin(t * 0.2);
    float c4 = sin(vTextureCoord.x * 7.0 + t / 5.0);

    float p = (c1 + c2 + c3 + c4) / 4.0;

    gl_FragColor = texture2D(uTexture, vec2(p, p));

}