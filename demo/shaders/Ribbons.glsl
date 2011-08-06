//# Vertex
varying vec4 vColor;

uniform sampler2D uColorSampler;

uniform vec2 uMousePosition;

void main(void) {
	vec4 p = vec4(aVertexPosition, 1.0);
    
    vColor = texture2D(uColorSampler, aVertexPosition.xy);
    float d = distance(uMousePosition, p.xy);
    
	gl_PointSize = 12.0 - 10.0 * length(d) * sin(uTime * aVertexPosition.z * 10.0 * brightness(vColor.rgb));
	
	
	
	vec4 pp = vec4(p.xy, 1.0, 1.0);
	
	//if(d < 0.05) {
	//	pp.xy = p.xy + normalize(p.xy - uMousePosition) * (0.05 - d);
	//} 
	
	gl_Position = mvpMatrix() * pp;
}

//# Fragment

varying vec4 vColor;

void main(void) {
	gl_FragColor = vColor;
}
