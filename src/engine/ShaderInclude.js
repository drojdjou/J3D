J3D.ShaderInclude = [
    "#ifdef GL_ES",
    "precision highp float;",
    "#endif",
	
	"float luminance(vec3 c) {",
	"    return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;",
	"}",
	
	"float brightness(vec3 c) {",
	"    return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;",
	"}",
	
	"struct lightSource {",
	"	int type;",
    "	vec3 direction;",
    "	vec3 color;",
    "	vec3 position;",
    "};",
	
	"vec3 computeLight(vec4 p, vec3 n, float si, float sh, lightSource light){",
	"    vec3 ld;",
	
	"    if(light.type == 0) return vec3(0);",
	"    else if(light.type == 1) ld = light.direction;",
	"    else if(light.type == 2) ld = normalize(light.position - p.xyz);",	
	"    float dif = max(dot(n, ld), 0.0);",
	
	"    float spec = 0.0;",
	"    if(si > 0.0) {",
	"    	vec3 eyed = normalize(-p.xyz);",
    "    	vec3 refd = reflect(-ld, n);",
	"    	spec = pow(max(dot(refd, eyed), 0.0), sh) * si;",
	"    };",
	
	"    return light.color * dif + light.color * spec;",
	"}"
];
