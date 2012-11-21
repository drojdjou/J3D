/**
 Creates a new Cubemap Texture

 @class A cubemap texture is used for texturing reflections, skyboxes and similar effects. If your shader expects a cubemap uniform use this object to create one.

 @param faces An object containing 6 paths to the textures. They need to be defined as 'left', 'right', 'up', 'down', 'back', 'front'.
 */
J3D.Cubemap = function(faces, params) {
    var that = this;
    this.tex = gl.createTexture();

    var facesLeft = 6;
    var faceImages = {};

    if (!params) params = {};

    var onLoad = function() {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, that.tex);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.front);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.back);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.up);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.down);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.right);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceImages.left);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

        if (params.onLoad) params.onLoad();
    }

    var onFace = function() {
        facesLeft--;
        if (facesLeft <= 0) onLoad();
    }

    var load = function(name, src) {

        if (typeof(src) == "string") {
            faceImages[name] = new Image();
            faceImages[name].onload = onFace;
            faceImages[name].src = src;
        } else if (!!src.getContext) {
            faceImages[name] = src;
            onFace();
        }
    }

    if (faces.left) {
        load("left", faces.left);
        load("right", faces.right);
        load("up", faces.up);
        load("down", faces.down);
        load("back", faces.back);
        load("front", faces.front);
    } else {
        load("left", faces);
        load("right", faces);
        load("up", faces);
        load("down", faces);
        load("back", faces);
        load("front", faces);
    }
}
