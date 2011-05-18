J3D.Particles = function(setup) {
	this.renderMode = J3D.RENDER_AS_OPAQUE;

	this.vertSize = 3;
	this.vertices = setup.positions;
	this.vertNum = setup.positions.length / this.vertSize;
	
	this.vertBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
	
	if (setup.colors) {
		this.colorSize = 4;
		this.colors = setup.colors;
		
		this.colorBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuf);
		gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
	}
	
	if (setup.animation) {
		if(!setup.animationSize) throw new Error("Please specify the size of animaton attribute");
		this.animSize = setup.animationSize;
		this.animation = setup.animation;
		
		this.animBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.animBuf);
		gl.bufferData(gl.ARRAY_BUFFER, this.animation, gl.STATIC_DRAW);
	}
}

J3D.Particles.prototype.setTransparency = function(transparency, srcFactor, dstFactor) {
	if(!transparency) {
		this.renderMode = J3D.RENDER_AS_OPAQUE;
	} else {
		this.renderMode = J3D.RENDER_AS_TRANSPARENT;
		this.srcFactor = srcFactor;
		this.dstFactor = dstFactor;
	}
}
