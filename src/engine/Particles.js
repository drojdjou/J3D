
J3D.Particles = function(setup){
	
	var origin = setup.origin || v3.ZERO();
	var spread = setup.spread || 0;
	var amount = setup.amount || 0;
	
	this.vertSize = 3;
	this.vertices = new Float32Array(amount * this.vertSize);
	this.vertNum = amount;
	
	this.colorSize = 4;
	this.colors = new Float32Array(amount * this.colorSize);

	
	for(var i = 0; i < amount * this.vertSize; i += this.vertSize) {
		this.vertices[i]   = origin.x + Math.random() * spread * 2.0 - spread + Math.random();
		this.vertices[i+1] = origin.y + Math.random() * spread * 2.0 - spread + Math.random();
		this.vertices[i+2] = origin.z + Math.random() * spread * 2.0 - spread + Math.random();
	}
	
	for(var i = 0; i < amount * this.colorSize; i++) {
		this.colors[i] = 0.5 + Math.random() / 2.0;
	}
	
	this.vertBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
	
	this.colorBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
	
}
