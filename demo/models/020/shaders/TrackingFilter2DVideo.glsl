//#name TrackingFilter2DVideo
//#author bartekd

//#include CommonFilterInclude
varying vec2 vTextureCoordOffset;
varying vec2 vTextureCoord;

//#vertex
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform vec2 offset;

void main(void) {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vTextureCoordOffset = aTextureCoord + offset;
}

//#fragment
uniform sampler2D uTexture;
uniform sampler2D videoTexture;
uniform float markerBarStart;

void main(void) {
    vec4 v = texture2D(videoTexture, vTextureCoord);
    vec4 c = texture2D(uTexture, vTextureCoordOffset);

    vec3 r = mix(v.rgb, c.rgb, c.a);

    if(vTextureCoord.y < markerBarStart) r = vec3(0.0);

    gl_FragColor = vec4(r, 1.0);
}