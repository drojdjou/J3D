//#name WaterFilter
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;
uniform float samplingOffset;
uniform vec2 lightPosition;
varying vec2 vTextureCoord;

void main(void) {
    vec2 tx = vTextureCoord;
    vec4 c = texture2D(uTexture, vTextureCoord);

    vec4 l = texture2D(uTexture, tx + vec2(-samplingOffset, 0));
    vec4 r = texture2D(uTexture, tx + vec2( samplingOffset, 0));
    vec4 t = texture2D(uTexture, tx + vec2(0,  samplingOffset));
    vec4 b = texture2D(uTexture, tx + vec2(0, -samplingOffset));

    vec3 ld = vec3(sin( (c.r - l.r) * 3.14 * 0.5 ), 0, cos( (c.r - l.r) * 3.14 * 0.5 ));
    vec3 rd = vec3(sin( (c.r - r.r) * 3.14 * 0.5 ), 0, cos( (c.r - r.r) * 3.14 * 0.5 ));

    vec3 td = vec3(0, (c.r - t.r), 1.0 - (c.r - t.r));
    vec3 bd = vec3(0, (c.r - b.r), 1.0 - (c.r - b.r));

    vec3 n = normalize(ld + rd + td + bd);

    vec3 light = normalize(vec3(lightPosition.x, lightPosition.y, 7.0));

    float diffuse = max(dot(n, light), 0.0);

    vec3 eyed = normalize(vec3(0.5, 0.5, 4.0) - vec3(tx.x, tx.y, 0.0));
    vec3 refd = reflect(-light, n);
    float spec = pow(dot(refd, eyed), 64.0) * 0.25;

    spec = min(1.0, spec);

    gl_FragColor = vec4(vec3(0.1, 0.4, 0.7) * diffuse + vec3(spec), 1.0);
}