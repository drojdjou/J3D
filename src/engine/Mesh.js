J3D.Mesh = function(source){
	this.vertSize = 3;
	this.uvSize = 2;
	this.colorSize = 4;

	this.vertices = new Float32Array(source.vertices);
	this.vertNum = source.vertices.length / this.vertSize;
	
	this.tris = new Uint16Array(source.tris);
	this.triNum = source.tris.length;

	this.colors = new Float32Array(source.colors);

	this.normals = new Float32Array(source.normals);
	
	this.hasUV1 = source.uv1.length > 0;
	if(this.hasUV1){
		this.uv1 = new Float32Array(source.uv1);
	} else {
		this.uv1 = new Float32Array(this.vertNum * this.uvSize);
	}

	this.buffersReady = false;
	this.vertBuf;
	this.colorBuf;
	this.normBuf;
	this.uv1buf;
	this.triBuf;
}

J3D.Mesh.prototype.draw = function(){
	gl.drawElements(gl.TRIANGLES, this.triNum, gl.UNSIGNED_SHORT, 0);
}

J3D.Mesh.prototype.bindBuffers = function(){
	if(this.buffersReady) return;
	
	this.vertBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
	
	this.colorBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
	
	this.normBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normBuf);
	gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
	
	this.uv1buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uv1buf);
	gl.bufferData(gl.ARRAY_BUFFER, this.uv1, gl.STATIC_DRAW);

	this.triBuf = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triBuf);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.tris, gl.STATIC_DRAW);
	
	this.buffersReady = true;
}
