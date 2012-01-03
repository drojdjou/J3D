//#name Lights
//#description Collection of light equations
//#description Requires CommonInclude
//#description TODO Separate functions for directional, spot, point, hemi/phong models for all, separate dif func from spec

struct lightSource {
	int type;

	vec3 direction;     // used by directional and spotlight (global direction of the transfom)
	vec3 position;      // used by point, spotlight (it's the global position of the transform)

	vec3 color;         // used by d/p/s and hemisphere
	float intensity;    // used by spherical harmonics & d/p/s
	float angleFalloff; // used by hemisphere and spotlight (TODO: change to falloff)
	float angle;        // used by spotlight
	// float attenuation; // used by point, spot, hemisphere (TODO: implement)
};

uniform lightSource uLight[4];

const float C1 = 0.429043;
const float C2 = 0.511664;
const float C3 = 0.743125;
const float C4 = 0.886227;
const float C5 = 0.247708;

// Constants for Old Town Square
//const vec3 L00  = vec3( 0.871297,  0.875222,  0.864470);
//const vec3 L1m1 = vec3( 0.175058,  0.245335,  0.312891);
//const vec3 L10  = vec3( 0.034675,  0.036107,  0.037362);
//const vec3 L11  = vec3(-0.004629, -0.029448, -0.048028);
//const vec3 L2m2 = vec3(-0.120535, -0.121160, -0.117507);
//const vec3 L2m1 = vec3( 0.003242,  0.003624,  0.007511);
//const vec3 L20  = vec3(-0.028667, -0.024926, -0.020998);
//const vec3 L21  = vec3(-0.077539, -0.086325, -0.091591);
//const vec3 L22  = vec3(-0.161784, -0.191783, -0.219152);

// Constants for Grace Cathedral
const vec3 L00  = vec3( 0.078908,  0.043710,  0.054161);
const vec3 L1m1 = vec3( 0.039499,  0.034989,  0.060488);
const vec3 L10  = vec3(-0.033974, -0.018236, -0.026940);
const vec3 L11  = vec3(-0.029213, -0.005562,  0.000944);
const vec3 L2m2 = vec3(-0.011141, -0.005090, -0.012231);
const vec3 L2m1 = vec3(-0.026240, -0.022401, -0.047479);
const vec3 L20  = vec3(-0.015570, -0.009471, -0.014733);
const vec3 L21  = vec3( 0.056014,  0.021444,  0.013915);
const vec3 L22  = vec3( 0.021205, -0.005432, -0.030374);

vec3 sphericalHarmonics(vec3 n, lightSource ls) {

    vec3 c =  C1 * L22 * (n.x * n.x - n.y * n.y) +
                    C3 * L20 * n.z * n.z +
                    C4 * L00 -
                    C5 * L20 +
                    2.0 * C1 * L2m2 * n.x * n.y +
                    2.0 * C1 * L21  * n.x * n.z +
                    2.0 * C1 * L2m1 * n.y * n.z +
                    2.0 * C2 * L11  * n.x +
                    2.0 * C2 * L1m1 * n.y +   
                    2.0 * C2 * L10  * n.z;
    
    c *= ls.intensity;
    return c;
}

vec3 hemisphere(vec4 p, vec3 n, float si, float sh, lightSource ls) {
	vec3 lv = normalize(ls.position - p.xyz);
    float dif = (dot(n, lv) * 0.5 + 0.5);
    dif = smoothstep(ls.angleFalloff, 1.0-ls.angleFalloff, dif);

	float spec = 0.0;

    if(si > 0.0) {
    	vec3 eyed = normalize(uEyePosition - p.xyz);
    	vec3 refd = reflect(-lv, n);
    	spec = pow(max(dot(refd, eyed), 0.0), sh) * si;
    };

    return ls.color * dif + ls.color * spec;
}

vec3 phong(vec4 p, vec3 n, float si, float sh, lightSource ls){
    vec3 ld;
	
	if(ls.type == 1) ld = -ls.direction;
    else ld = normalize(ls.position - p.xyz);
    
    float dif = max(dot(n, ld), 0.0);
	
    float spec = 0.0;
    
    if(si > 0.0) {
    	vec3 eyed = normalize(uEyePosition - p.xyz);
    	vec3 refd = reflect(-ld, n);

    	// 0  - 1 where 1 = vectors are paralel (max intensity)
    	// sh = for 0 

    	spec = pow( (dot(refd, eyed) + 1.0) * 0.5, sh * 4.0) * si;
    }

    if(ls.type == 3) {
        float dd = dot(ld, -ls.direction);
        float ca = cos(ls.angle);
        float cf = cos(ls.angle + ls.angleFalloff);

        float spm = smoothstep(cf, ca, dd);

        dif *= spm;
        spec *= spm;
    }

    dif *= ls.intensity;

    return ls.color * dif + ls.color * spec;
}

vec3 singleLight(vec4 p, vec3 n, float si, float sh, lightSource ls) {
	if(ls.type == 0) {
		// Ambient
		return ls.color;
	} else if(ls.type > 0 && ls.type < 4) {
		// Directional / Point / Spotlight
		return phong(p, n, si, sh, ls);
	} else if(ls.type == 4) {
		return hemisphere(p, n, si, sh, ls);
	} else if(ls.type == 5) {
		return sphericalHarmonics(n, ls);
	} else {
		return vec3(0);
	}
}

vec3 computeLights(vec4 p, vec3 n, float si, float sh) {
	vec3 s = vec3(0);
	s += singleLight(p, n, si, sh, uLight[0]);
	s += singleLight(p, n, si, sh, uLight[1]);
	s += singleLight(p, n, si, sh, uLight[2]);
	s += singleLight(p, n, si, sh, uLight[3]);
	return s;
}



