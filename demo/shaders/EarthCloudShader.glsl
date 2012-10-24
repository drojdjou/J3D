//#name EarthCloudShader
//#include CommonInclude

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

//#vertex
//#include VertexInclude

void main(void) {
    vTextureCoord = getTextureCoord(aTextureCoord);
    vNormal = nMatrix * aVertexNormal;
    vPosition = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * vPosition;
}

//#fragment
//#include Lights

uniform sampler2D cloudTexture;
uniform float shininess;
uniform float cloudIntensity;

void main(void) {

    float df = computeLights(vPosition, vNormal, 0.0, 0.0).r;
    df = max(0.0, df);

    vec4 d = texture2D(cloudTexture, vTextureCoord);
    vec3 c = vec3( 0.3 + df * 0.7 );

    gl_FragColor = vec4(c, d.r * cloudIntensity);
}