//#name TrackingFilter2D
//#author bartekd

//#include CommonFilterInclude

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform vec2 offset;

void main(void) {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    vTextureCoord = aTextureCoord + offset;
}

//#fragment
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {
    gl_FragColor = texture2D(uTexture, vTextureCoord);
}