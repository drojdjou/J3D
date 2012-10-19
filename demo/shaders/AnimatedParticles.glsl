	//#name ParticleShader
	//#include CommonInclude

	//#vertex
	//#include VertexInclude
	attribute vec2 aVertexAnimation;

	varying vec4 vColor;
	varying float eyeDist;
	varying float orderPos;

	void main(void) {

		orderPos = mod(aVertexAnimation.x - uTime * 0.5, 1.0);

		float a = aVertexPosition.x - uTime * 0.4;
		float b = aVertexPosition.y * uTime * 5.0;

		float r = 27.5 + 5.0 * sin(a * 8.0);
		vec3 knotPos = vec3(cos(a * 5.0) * r, sin(a * 4.0) * r, cos(a * 8.0) * r * 2.0);

		float z = aVertexPosition.z;
		vec3 orbitPos = vec3(cos(b) * z, sin(b) * z, cos(b) * z);

		vec4 worldPos = mMatrix * vec4(knotPos + orbitPos, 1.0);

		vColor = aVertexColor;
		eyeDist = clamp( distance( uEyePosition, worldPos.xyz ) / 240.0, 0.0, 1.0);

		gl_Position = pMatrix * vMatrix * worldPos;
		gl_PointSize = 30.0 * (1.0 - eyeDist);
	}

	//#fragment
	uniform vec4 uColor;
	uniform sampler2D uParticleTex;

	varying vec4 vColor;
	varying float eyeDist;
	varying float orderPos;

	void main(void) {
		vec4 texCol = texture2D(uParticleTex, gl_PointCoord);
		vec3 indCol = vec3(orderPos, orderPos, 0.5 - orderPos);
		gl_FragColor = vec4( indCol * vec3(1.0 - eyeDist) * uColor.rgb, texCol.a * (1.0 - eyeDist) );
	}