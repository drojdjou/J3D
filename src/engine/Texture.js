J3D.Texture = function(source){
	var that = this;
	this.tex = gl.createTexture();
	
	var onLoad = function(){
		gl.bindTexture(gl.TEXTURE_2D, that.tex);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.img);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	var load = function(src){
		that.img = new Image();
    	that.img.onload = function() {
			onLoad();
    	}
		that.img.src = src;
	}
	
	
	if (typeof(source) == "string") {
		load(source);
	}
}
