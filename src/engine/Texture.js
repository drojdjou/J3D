J3D.Texture = function(source){
	var that = this;
	this.tex = gl.createTexture();
		
	var onLoad = function(){
		gl.bindTexture(gl.TEXTURE_2D, that.tex);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.src);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		
		gl.generateMipmap(gl.TEXTURE_2D);
		
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	var load = function(src){
		that.src = new Image();
    	that.src.onload = function() {
			onLoad();
    	}
		that.src.src = src;
	}
	
	
	if (typeof(source) == "string") {
		load(source);
	}
}
