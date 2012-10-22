/**
    Creates a new Transform

    @class A transform represents a point in 3d world. A point has a position, rotation and scale. Since everything in J3D is a transform, many different things can be attached, like a camera, light source or, in most cases, geometry and a renderer. A transform can also be used as a hierarchy building element - it can have it's own child transforms.

    @param n A name to identify the transform. Not required and doesn't have to be unique, but it is useful if you want to use the find function to search for transforms in your scene later on. Used by the Loader when loading scenes exported from Unity3d.

    @param u A unique id for this transform. Not required, it's mostly used but the Loader when loading scenes exported with Unity3d.
 */
J3D.Transform = function(n, u) {
    
    var that = this;
    var children = [];

    /**
     * A unique id of this transform.
     */
    this.uid = u || 0;

    /**
     * A name of this transform that can be used in paths for the J3D.Transform.find() function.
     */
    this.name = n;

    /**
     * The number of child transforms the transform has.
     */
    this.numChildren = 0;

    /**
     * Position of the transform relative to parents coordinate system. It's ok to manipulate this value directly.
     */
    this.position = v3.ZERO();

    /**
     * Rotstion of the transform relative to parents coordinate system. It's ok to manipulate this value directly.
     */
    this.rotation = v3.ZERO();

    /**
     * Scale of the transform relative to parents coordinate system. It's ok to manipulate this value directly.
     */
    this.scale = v3.ONE();

    /**
     * This gets only updated for lights. Do not manipulate directly, it will be overwritten by the rendering function.
     */
    this.worldPosition = v3.ZERO();

    /**
     * Local transformation matrix. Do not manipulate directly, it will be overwritten by the rendering function.
     */
    this.matrix = mat4.create();

    /**
     * World transformation matrix (concatenated local transforms of all parents and self). Do not manipulate directly, it will be overwritten by the rendering function.
     */
    this.globalMatrix = mat4.create();

    /**
     * Normal matrix (inverse/transpose of global matrix for use with normals). Do not manipulate directly, it will be overwritten by the rendering function.
     */
    this.normalMatrix = mat3.create();

    this.isStatic = false;
    this._lockedMatrix = false;

    /**
     *  If set to false, this transform will not be rendered. But it's children still will!
     */
    this.enabled = true;

    /**
     *  The renderer is an instance of J3D.Shader. Any 3d object in the scene needs to have a renderer and a geometry property.
     */
    this.renderer;

    /**
     *  The geometry is an instance of J3D.Geometry. Any 3d object in the scene needs to have a renderer and a geometry property.
     */
    this.geometry;

    /**
     * A camera attached to the transform, instance of J3D.Camera. Attaching the camera to a transform allows to manipulate it's position and rotation.
     */
    this.camera;

    /**
     * A light attached to the transform, instance of J3D.Light.
     */
    this.light;

    /**
     * A collider attached to the transform, instance of J3D.Collider. Notice that a collider can be attached to a transform without it having a renderer and a geometry. This can be useful in complex scene setups, where, ex. the parent transform has a collider and child transforms have 3d geometries and renderers.
     */
    this.collider;

    // Texture tile and offset.
    // Can also be specified in the renderer, but this will override
    // the settings for this specific object unless tile = 1,1 and offset = 0,0
    this.textureTile = v2.ONE();
    this.textureOffset = v2.ZERO();

    /**
     * Add a child transform to this transform.
     *
     * @param t J3D.Transform to look add. Multiple arguments are accepted.
     */
    this.add = function(t) {
		var fa;
		for (var i = 0; i < arguments.length; i++) {
			var t = arguments[i];
			if(!fa) fa = t;
			if (children.indexOf(t) == -1) children.push(t);
			t.parent = that;
			that.numChildren = children.length;
		}
		return fa;
    }

    /**
     * Checks if a given transform is a child of this transform. This function is not recursive!
     *
     * @param t J3D.Transform to look for
     *
     * @returns Boolean, true if child found, false otherwise
     */
    this.contains = function(t) {
        return children.indexOf(t) > -1;
    }

    /**
     * Run a function on itself and all it's ancestors.
     *
     * @param f The function to run. The only argument that this function will receive is the processed transform.
     */
    this.recurse = function(f) {
        f(that);
        for (var i = 0; i < children.length; i++) {
            children[i].recurse(f);
        }
    }

    /**
     * Removes a child transform.
     *
     * @param t J3D.Transform to remove
     *
     * @param any Boolean, if true, searches for the transform recursively in the hierarchy
     *
     * @returns True if child was removed, false otherwise
     */
    this.remove = function(t, any) {
        if (that.contains(t)) {
            children.splice(children.indexOf(t), 1);
            that.numChildren = children.length;
            t.parent = null;
            return true;
        } else if (any) {
            for (var i = 0; i < children.length; i++) {
                if(children[i].remove(t)) return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Returns the child transform at a given position.
     *
     * @param i Index of the child to retreive
     *
     * @returns {J3D.Transform}
     */
    this.childAt = function(i) {
        return children[i];
    }

    /**
     * @returns {string} A path leading the this transform in the scene (uses '/' notation)
     */
    this.path = function() {
        var pe = [];
        pe.push(that.name);

        var p = that.parent;

        while(p != null) {
            pe.push(p.name);
            p = p.parent;
        }

        return pe.reverse().join("/");
    }
}

/**
 * When cloning a transform some properties need to be copied, some need to be shader. This method makes it easier to create copies of transforms.
 *
 * @returns A deep copy of the transform
 */
J3D.Transform.prototype.clone = function() {
    var c = new J3D.Transform();
    c.position = this.position.cp();
    c.rotation = this.rotation.cp();
    c.scale = this.scale.cp();

    c.isStatic = this.isStatic;

    c.renderer = this.renderer;
    c.geometry = this.geometry;
    c.camera = this.camera;
    c.light = this.light;
    c.collider = this.collider;

    return c;
}

/**
 * @returns Transforms a vector transformed by the transforms normal matrix
 */
J3D.Transform.prototype.transformDirection = function(d) {
    // TODO: optimize
    var tm = mat4.create();
    var tv = vec3.create();
    tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), d.xyz(), tv);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

/**
 * @returns Transforms world forward pointing vector
 */
J3D.Transform.prototype.forward = function() {
    // TODO: optimize
    var tm = mat4.create();
    var tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), [0,0,-1]);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

/**
 * @returns Transforms world left pointing vector
 */
J3D.Transform.prototype.left = function() {
    // TODO: optimize
    var tm = mat4.create();
    var tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), [-1,0,0]);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

/**
 * Updates the world matrix of this transform by concatenating the transforms world matrix with its parents. Called internally by the engine during rendering.
 *
 * @param parent The parent transform
 */
J3D.Transform.prototype.updateWorld = function(parent) {
    if (this._lockedMatrix) return;

    mat4.identity(this.matrix);

    mat4.translate(this.matrix, [this.position.x, this.position.y, this.position.z]);

    mat4.rotateZ(this.matrix, this.rotation.z);
    mat4.rotateX(this.matrix, this.rotation.x);
    mat4.rotateY(this.matrix, this.rotation.y);

    mat4.scale(this.matrix, [this.scale.x, this.scale.y, this.scale.z]);

    if (parent != null) mat4.multiply(parent.globalMatrix, this.matrix, this.globalMatrix);
    else this.globalMatrix = this.matrix;

    mat4.toInverseMat3(this.globalMatrix, this.normalMatrix);
    mat3.transpose(this.normalMatrix);

    if (this.isStatic) this._lockedMatrix = true;
}

/**
 * Updates the world position of the transform. Can be called if world position is necessary for any reason, otherwise, the engine is calling this function only if the transform has a light.
 */
J3D.Transform.prototype.updateWorldPosition = function() {
    var tmp = [0,0,0];
    mat4.multiplyVec3(this.globalMatrix, tmp);
    this.worldPosition.x = tmp[0];
    this.worldPosition.y = tmp[1];
    this.worldPosition.z = tmp[2];
}

J3D.Transform.prototype.getTileOffset = function() {
    var t, o;

    if (this.renderer.textureTile && this.textureTile.isOne()) t = this.renderer.textureTile.xy();
    else t = this.textureTile.xy();

    if (this.renderer.textureOffset && this.textureOffset.isZero()) o = this.renderer.textureOffset.xy();
    else o = this.textureOffset.xy();

    return t.concat(o);
}

/**
 * Find a child transform by name.
 *
 * @param path A path as string. '/' can be used to look through the hierarchy.
 */
J3D.Transform.prototype.find = function(path) {
    var p = path.split("/");
    
    for (var i = 0; i < this.numChildren; i++) {
        if (this.childAt(i).name == p[0]) {
            if (p.length == 1) return this.childAt(i);
            else return this.childAt(i).find(p.slice(1).join("/"));
        }
    }

    return null;
}

/**
 * Calculate the inverse of the global matrix for this transform.
 * This method is mostly useful if the transform holds a camera.
 * After this method is invoked, the inverseMat property becomes available on this object.
 */
J3D.Transform.prototype.updateInverseMat = function() {
    if (!this.inverseMat) this.inverseMat = mat4.create();
    mat4.inverse(this.globalMatrix, this.inverseMat);
    this.updateWorldPosition();
}

