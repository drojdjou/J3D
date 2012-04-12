J3D.FrameBuffer = function(width, height) {
    var that = this;

    this.width = (width) ? width : gl.viewportWidth;
    this.height = (height) ? height : gl.viewportHeight;

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

    var resize = function() {
        that.width = gl.viewportWidth;
        that.height = gl.viewportHeight;

        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, that.width, that.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        gl.bindRenderbuffer(gl.RENDERBUFFER, that.depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, that.width, that.height);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }

    if (!width) {
        window.addEventListener("resize", resize);
    }
}

J3D.FrameBuffer.prototype.bind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
}

J3D.FrameBuffer.prototype.unbind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

