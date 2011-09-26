J3D.Texture = function(source, params){ // <- use this to pass parameters of the texture
	var that = this;
	this.tex = gl.createTexture();
	
	this.wrapMode = gl.REPEAT;
	this.magFilter = gl.LINEAR;
	this.minFilter = gl.LINEAR_MIPMAP_NEAREST;

	if (params) {
		this.onLoad = params.onLoad;
		this.mipmap = (params.mipmap != null) ? params.mipmap : true;
		this.flip = (params.flip != null) ? params.flip : true;
	} else {
		this.mipmap = true;
		this.flip = true;
	}
	
	var isPOT = function(x, y){
	    return x > 0 && y > 0 && (x & (x - 1)) == 0 && (y & (y - 1)) == 0;
	}
		
	var setupTexture = function(){
		// console.log(that.src.width + " x " + that.src.height + " isPOT: " + isPOT(that.src.width, that.src.height));
		
		var p = that.src && isPOT(that.src.width, that.src.height);
		
		gl.bindTexture(gl.TEXTURE_2D, that.tex);
		
		console.log("Unflip texture " + source + " : " + that.flip);
		
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, that.flip);
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.src);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, that.magFilter);
		
		if(p) gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, that.minFilter);
		else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		
		if (p) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, that.wrapMode);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, that.wrapMode);
		} else { // Non-POT textures can only be clamped to edge
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}
		
		if(that.mipmap && p) gl.generateMipmap(gl.TEXTURE_2D);	
		gl.bindTexture(gl.TEXTURE_2D, null);
		
		if(that.onLoad) that.onLoad.call();
	}
	
	var load = function(src){
		that.src = new Image();
    	that.src.onload = function() {
			setupTexture();
    	}
		that.src.src = src;
	}

	if (typeof(source) == "string") {
		load(source);
	}
}

J3D.Texture.prototype.toUniform = function(){
	return this.tex;
}
