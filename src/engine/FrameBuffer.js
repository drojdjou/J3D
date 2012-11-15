/**
    Creates a new FrameBuffer

    @class A FrameBuffer is used in render-to-texture, image effects and other advances rendering schemes.

    @params width The width of the frame buffer

    @params height The width of the frame buffer
 */
J3D.FrameBuffer = function(width, height) {
    var that = this;

    this.width = (width) ? width : gl.viewportWidth;
    this.height = (height) ? height : gl.viewportHeight;

//    console.log(this.viewportWidth, this.viewportHeight);

    this.fbo = gl.createFramebuffer();
    this.texture = gl.createTexture();
    this.depthBuffer = gl.createRenderbuffer();

    // bind fbo
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

    // bind & setup texture
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // bind render buffer
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

    // attach texture and render buffer to fbo
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);

    // unbind all
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.resize = function(w, h) {
        this.width = (w) ? w : gl.viewportWidth;
        this.height = (h) ? h : gl.viewportHeight;

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }

    var autoResize = function() {
        that.resize();
    }

    if (!width) {
        window.addEventListener("resize", autoResize);
    }
}

J3D.FrameBuffer.prototype.bind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
}

J3D.FrameBuffer.prototype.unbind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

