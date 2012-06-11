J3D.PERSPECTIVE = 0; // <- if not provided, this one is default
J3D.ORTHO = 1;

/**
<p>Creates a new Camera that is used as point of view for rendering</p>

<p>For a perspective projection setup the parameters are:<br>
 type, fov, near, far, aspect</p>

<p>For an orthographic projection setup the parameters are:<br>
 type, left, right, top, bottom, near, far</p>

@class A camera represents a point of view. A camera is typically attached to a transform, and moving/rotting that transform allows to manipulate that point of view.
 
@param params Object literal, a set of parameters to setup the camera
 */
J3D.Camera = function(params) {
    that = this;

    if (!params) params = {};

    if (!params.type) params.type = J3D.PERSPECTIVE;

    if (!params.near) params.near = 1;
    if (!params.far) params.far = 1000;

    if (params.type == J3D.PERSPECTIVE) {
        if (!params.fov) params.fov = 45;
    } else {
        if (params.left == null) params.left = 0;
        if (params.right == null) params.right = 1;
        if (params.top == null) params.top = 0;
        if (params.bottom == null) params.bottom = 1;
    }

    this.near = params.near;
    this.far = params.far;
    this.fov = params.fov;

    this.onResize = function() {
        this.projectionMat = new m44();
        
        if (params.type == J3D.PERSPECTIVE) {
            this.aspect = gl.viewportWidth / gl.viewportHeight;
            this.projectionMat.perspective(params.fov, this.aspect, params.near, params.far);
        } else {
            this.projectionMat.ortho(params.left, params.right, params.top, params.bottom, params.near, params.far);
        }
    }

    this.onResize();
}


