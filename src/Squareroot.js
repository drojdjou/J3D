/**
 * @class
 *
 * The engine.
 *
 * @param canvas
 * @param divContainer
 */
SQR.Squareroot = function(canvas, divContainer) {
	var uniforms = {};
	uniforms.projection = new SQR.ProjectionMatrix();
	
	this.lightDirection = new SQR.V3(0, 1, 0).norm();

    var sortingOn = true;

    this.setSorting = function(on) {
        sortingOn = on;
    }

    this.setBackground = function(c) {
        if(canvas) canvas.style.backgroundColor = c;
        if(divContainer) divContainer.style.backgroundColor = c;
    }

    this.setClearColor = function(c) {
        clearColor = c;
    }

    this.setProjection = function(fov) {
        uniforms.cssDistance = 0.5 / Math.tan(fov * Math.PI / 360) * uniforms.height;
        uniforms.projection.perspective(fov, uniforms.width / uniforms.height, 0.1, 1000);

        if (divContainer) {
            divContainer.style['perspective'] = uniforms.cssDistance + 'px';
            divContainer.style['-webkit-perspective'] = uniforms.cssDistance + 'px';
            divContainer.style['-moz-perspective'] = uniforms.cssDistance + 'px';
            divContainer.style['-o-perspective'] = uniforms.cssDistance + 'px';
        }
    }

    /**
     * Returns a distance. If a CSS object is placed at this distance from the camera it will be
     * scaled to the same size as it original size.
     */
    this.cssDistance = function() {
        return uniforms.cssDistance;
    }

    /**
     * 
     * @param w
     * @param h
     */
    this.setSize = function(w, h) {
        uniforms.width = w;
        uniforms.height = h;

        if (canvas) {
            canvas.width = w;
            canvas.height = h;
        }

        uniforms.aspect = w / h;
        uniforms.centerX = w * 0.5;
        uniforms.centerY = h * 0.5;
    }

    this.children = [];
    this.numChildren = 0;

    var renderObjects = [];

    this.add = function() {
        for (var i = 0; i < arguments.length; i++) {
            var t = arguments[i];
            t.parent = null;
            if (this.children.indexOf(t) == -1) this.children.push(t);
        }
        this.numChildren = this.children.length;
    }

    this.remove = function() {
        for (var i = 0; i < arguments.length; i++) {
            var t = arguments[i];
            var j = this.children.indexOf(t);

            if (j == -1) return false;

            t.parent = null;

            if (t.renderer && (t.renderer.isDom2d || t.renderer.isDom3d)) {
                t.renderer.removeFromDom();
            }

            this.children.splice(j, 1);
        }

        this.numChildren = this.children.length;
    }

    this.contains = function(t) {
        return this.children.indexOf(t) > -1;
    }

    this.recurse = function(f) {
        for (var i = 0; i < this.numChildren; i++) {
            this.children[i].recurse(f);
        }
    }

    this.removeAll = function() {
        for (var i = 0; i < this.numChildren; i++) {
            var t = this.children[i];
            t.parent = null;

            if (t.renderer && (t.renderer.isDom2d || t.renderer.isDom3d)) {
                t.renderer.removeFromDom();
            }
        }

        this.children = [];
        this.numChildren = this.children.length;
    }

    var updateTransform = function(t) {
        if (t.renderer) {
            if (t.renderer.isDom3d && SQR.usePreserve3d && t.parent && t.parent.renderer && t.parent.renderer.isDom3d) {
                t.renderer.appendToDom(t.parent.renderer.element);
            } else if (t.renderer.isDom2d || t.renderer.isDom3d) {
                t.renderer.appendToDom(divContainer);
            }
        }

        t.transformWorld();
        renderObjects.push(t);

        if (t.numChildren > 0) {
            for (var i = 0; i < t.numChildren; i++) {
                updateTransform(t.children[i]);
            }
        }
    }

    this.render = function(camera) {

        SQR.Time.tick();
        var i, ad, bd;

        renderObjects.length = 0;

        if (!!uniforms.context) {
            uniforms.context.setTransform(1, 0, 0, 1, 0, 0);

            if (clearColor != null) {
                uniforms.context.fillStyle = clearColor;
                uniforms.context.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                uniforms.context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        for (i = 0; i < this.numChildren; i++) {
            updateTransform(this.children[i]);
        }

        var l = renderObjects.length, c;

        uniforms.camera = camera;
        uniforms.viewMatrix = camera.computeInverseMatrix();
        uniforms.lightDirection = this.lightDirection;

        for (i = 0; i < l; i++) {
            c = renderObjects[i];
            c.transformView(uniforms.viewMatrix);
        }

        if(sortingOn) {
            renderObjects.sort(function(a, b) {

                var ad = a.depth();
                var bd = b.depth();

                if (ad < bd) return -1;
                if (ad > bd) return 1;
                
                return 0;
            });
        }

        for (i = 0; i < l; i++) {
            c = renderObjects[i]

            if(!c.enabled) continue;

            if (c.renderer) {
                uniforms.depth = i;
                c.renderer.draw(c, uniforms);
            }

            if(c.collider) {
                c.collider.project(c, uniforms);
            }
        }
    }

    if (canvas) {
        uniforms.context = canvas.getContext("2d");
        this.setSize(canvas.width, canvas.height);
    }

    if(divContainer) {
        divContainer.style.webkitTransformStyle = "preserve-3d";
        divContainer.style.transformStyle = "preserve-3d";
    }

    uniforms.projection.identity();
    uniforms.container = divContainer;
	
    this.lightDirection.set(0, 1, 0).norm();

    var clearColor = null;
}