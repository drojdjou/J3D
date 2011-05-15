J3D.ParticleSystem = function(setup){
	
	this.vertSize = 3;
	this.vertices = new Float32Array(setup.numParticles * this.vertSize);
	this.vertNum = setup.numParticles;
	
	this.colorSize = 4;
	this.colors = new Float32Array(setup.numParticles * this.colorSize);

	
	for(var i = 0; i < setup.numParticles * this.vertSize; i++) {
		this.vertices[i] = Math.random() * setup.spread * 2.0 - setup.spread + Math.random();
	}
	
	for(var i = 0; i < setup.numParticles * this.colorSize; i++) {
		this.colors[i] = 0.5 + Math.random() / 2.0;
	}
	
	this.vertBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
	
	this.colorBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
	
}
