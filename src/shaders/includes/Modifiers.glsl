//#name Modifiers
//#description A collection of modifier functions for geometry (only bend for now)

vec3 bend(vec3 ip, float ba, vec2 b, float o, float a) {
	vec3 op = ip;
	
	ip.x = op.x * cos(a) - op.y * sin(a);
  	ip.y = op.x * sin(a) + op.y * cos(a);	

	if(ba != 0.0) {
		float radius = b.y / ba;
		float onp = (ip.x - b.x) / b.y - o;
		ip.z = cos(onp * ba) * radius - radius;
		ip.x = (b.x + b.y * o) + sin(onp * ba) * radius;
	}
	
	op = ip;
	ip.x = op.x * cos(-a) - op.y * sin(-a);
  	ip.y = op.x * sin(-a) + op.y * cos(-a);

	return ip;
}
