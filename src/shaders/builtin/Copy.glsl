//#name CopyFilter
//#description All this shader does is to render a texture (typically a render texture) pixel-to-pixel.
//#description It is useful in effects like Persistence
//#author bartekd

//#include CommonFilterInclude

//#vertex
//#include BasicFilterVertex

//#fragment
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {
    vec4 p = texture2D(uTexture, vTextureCoord);
    gl_FragColor = vec4(p.rgb, 1.0);
}