/**
 Creates a new Texture

 @class A texture represents a graphical image used as texture by a shader.

 @param source can be either a string containing with a path to an image, or a canvas, video or image elements.

 @param params Object, a set of parameters to setup the texture.
 */
J3D.Texture = function(source, params) { // <- use this to pass parameters of the texture
    var that = this;
    this.tex = gl.createTexture();

    this.autoLoad = true || params.autoLoad;

    if (!params) params = {};
    this.loaded = false;
    this.isVideo = false;

    this.mipmap = (params.mipmap != null) ? params.mipmap : true;
    this.flip = (params.flip != null) ? params.flip : true;
    this.magFilter = params.magFilter || gl.LINEAR;
    this.minFilter = params.minFilter || (params.mipmap) ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR;

    var isPOT = function(x, y) {
        return x > 0 && y > 0 && (x & (x - 1)) == 0 && (y & (y - 1)) == 0;
    }

    this.isPowerOfTwo = function() {
        return that.src && isPOT(that.src.width, that.src.height);
    }

    var setupTexture = function() {
        if (that.loaded) return;

        var p = that.src && isPOT(that.src.width, that.src.height);

        if (!that.wrapMode) that.wrapMode = params.wrapMode || (p) ? gl.REPEAT : gl.CLAMP_TO_EDGE;

        gl.bindTexture(gl.TEXTURE_2D, that.tex);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, that.flip);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.src);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, that.magFilter);

        if (that.mipmap && p) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        if (p) gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, that.minFilter);
        else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        if (p) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, that.wrapMode);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, that.wrapMode);
        } else {
            if (that.wrapMode != gl.CLAMP_TO_EDGE) {
                console.warn("WARNING! Texture: " + source + " : only CLAMP_TO_EDGE wrapMode is supported for non-power-of-2 textures.");
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }


        gl.bindTexture(gl.TEXTURE_2D, null);

        if (params.onLoad) params.onLoad();

        that.loaded = true;
    }

    var loadImage = function(src) {
        that.src = new Image();

        that.src.crossOrigin = params.cors || "";

        that.src.onload = function() {
            setupTexture();
        }

        that.src.src = src;
    }

    var loadVideo = function(src, ext) {
        that.isVideo = true;
        that.src = document.createElement('video');
        that.src.src = src;
        that.src.preload = 'auto';
        // looping is done manually below
        that.src.loop = false;

        var onCanPlayThrough = function() {
            that.src.removeEventListener('canplaythrough', onCanPlayThrough);
            if (params.autoPlay) that.src.play();
            setupTexture();
        };

        var onEnded = function() {

            if (params.onEnded) params.onEnded(that);

            if (params.loop) {
                that.src.currentTime = 0;
                that.src.play();
            }

        };

        // restart the video if it is looped and call a callback on the way
        that.src.addEventListener('ended', onEnded, false);

        // canplaythrough doesn't seem to be invoked by safari
        that.src.addEventListener('canplaythrough', onCanPlayThrough, false);

        that.src.load();
    }

    if (typeof(source) == "string") {
        var ext = source.substring(source.lastIndexOf(".") + 1).toLowerCase();

        switch (ext) {
            case "jpg":
            case "png":
            case "gif":
                loadImage(source);
                break;
            case "mp4":
            case "webm":
            case "ogv":
                loadVideo(source, ext);
                break;
            default:
                // Assume it's a URL to a dynamic image or video
                if (params.image) loadImage(source);
                else if (params.video) loadVideo(source, ext);
                else console.log("Texture format not detected from source path and not specifed in params.")
                break;
        }

    } else if (!!source.getContext) {
        that.src = source;
        setupTexture();
    } else if (source instanceof HTMLVideoElement) {
        that.isVideo = true;
        that.src = source;

        var onCanPlayThrough = function() {
            that.src.removeEventListener('canplaythrough', onCanPlayThrough);
            setupTexture();
        };

        that.src.addEventListener('canplaythrough', onCanPlayThrough, false);
    } else {
        console.log("Video format not recognized: " + typeof(source));
        console.log(source instanceof HTMLVideoElement);
    }
}

J3D.Texture.prototype.update = function(force) {
    if (force || (this.loaded && this.isVideo)) {
        try {
            gl.bindTexture(gl.TEXTURE_2D, this.tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.src);
            gl.bindTexture(gl.TEXTURE_2D, null);
        } catch(e) {
            // console.log(e);
            // Firefox will throw an error when the video is looped at the moment it loops.
            // If you don't catch this error here, it will result in a nasty 1-frame blink of the video.
        }
    }
}
