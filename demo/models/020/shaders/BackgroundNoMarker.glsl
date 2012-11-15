//#name BackgroundNoMarker
//#author bartekd

//#include CommonFilterInclude
varying vec2 vTextureCoord;

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

void main(void) {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}

//#fragment
uniform sampler2D uTexture;
uniform float markerBarStart;

void main(void) {
    vec3 c = texture2D(uTexture, vTextureCoord).rgb;
    if(vTextureCoord.y < markerBarStart) c = vec3(0.0);
    gl_FragColor = vec4(c, 1.0);
}