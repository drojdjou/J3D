//#name BasicFilterVertex
//#description A basic vertex shader for filters that use a full screen quad and have all the logic in fragment shader
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main(void) {
	gl_Position = vec4(aVertexPosition, 0.0, 1.0);
	vTextureCoord = aTextureCoord;	
}

