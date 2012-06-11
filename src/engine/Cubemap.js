
J3D.Cubemap = function(faces){
	var that = this;
	this.tex = gl.createTexture();
	
	this.facesLeft = 6;
	this.faceImages = {};
	
	var onLoad = function() {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, that.tex);
		
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.front);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.back);
		
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.up);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.down);
		
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.right);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.faceImages.left);
		
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}
	
	var onFace = function() {
		that.facesLeft--;
		if(that.facesLeft == 0) onLoad();
	}
	
	var load = function(name, src){

        if (typeof(src) == "string") {
            that.faceImages[name] = new Image();
            that.faceImages[name].onload = function() {
                onFace();
            }
            that.faceImages[name].src = src;
        } else if(!!src.getContext) {
            that.faceImages[name] = src;
            onFace();
        }
	}
	
	
	load("left", 	faces.left);
	load("right", 	faces.right);
	load("up", 		faces.up);
	load("down", 	faces.down);
	load("back", 	faces.back);
	load("front", 	faces.front);
}

J3D.Cubemap.prototype.toUniform = function(){
	return this.tex;
}
