J3D.Transform = function(n, u) {
    var that = this;

    this.uid = u || 0;
    this.name = n;

    var children = [];
    this.numChildren = 0;

    // All local
    this.position = v3.ZERO();
    this.rotation = v3.ZERO();
    this.scale = v3.ONE();

    // This gets only updated for lights
    this.worldPosition = v3.ZERO();

    // Local transformation matrix
    this.matrix = mat4.create();
    // World transformation matrix (concatenated local transforms of all parents and self)
    this.globalMatrix = mat4.create();
    // Normal matrix (inverse/transpose of global matrix for use with normals)
    this.normalMatrix = mat3.create();

    this.isStatic = false;
    this._lockedMatrix = false;
    this.enabled = true;

    this.renderer;
    this.geometry;
    this.camera;
    this.light;
    this.collider;

    // Texture tile and offset.
    // Can also be specified in the renderer, but this will override
    // the settings for this specific object unless tile = 1,1 and offset = 0,0
    this.textureTile = v2.ONE();
    this.textureOffset = v2.ZERO();

    this.add = function(t) {
		var fa;
		for (var i = 0; i < arguments.length; i++) {
			var t = arguments[i];
			if(!fa) fa = t;
			children.push(t);
			t.parent = that;
			that.numChildren = children.length;
		}
		return fa;
    }

    this.contains = function(t) {
        return children.indexOf(t) > -1;
    }

    this.recurse = function(f) {
        f(that);
        for (var i = 0; i < children.length; i++) {
            children[i].recurse(f);
        }
    }

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

    this.childAt = function(i) {
        return children[i];
    }

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

J3D.Transform.prototype.transformDirection = function(d) {
    // TODO: optimize
    var tm = mat4.create();
    var tv = vec3.create();
    tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), d.xyz(), tv);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

J3D.Transform.prototype.forward = function() {
    // TODO: optimize
    var tm = mat4.create();
    var tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), [0,0,-1]);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

J3D.Transform.prototype.left = function() {
    // TODO: optimize
    var tm = mat4.create();
    var tv = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, tm), [-1,0,0]);
    return new v3(tv[0], tv[1], tv[2]).norm();
}

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

J3D.Transform.prototype.find = function(p) {

    for (var i = 0; i < this.numChildren; i++) {
        if (this.childAt(i).name == p[0]) {
            if (p.length == 1) return this.childAt(i);
            else return this.childAt(i).find(p.slice(1));
        }
    }

    return null;
}

// Used if transform is a camera
J3D.Transform.prototype.updateInverseMat = function(transform) {
    if (!this.inverseMat) this.inverseMat = mat4.create();
    mat4.inverse(this.globalMatrix, this.inverseMat);
    this.updateWorldPosition();
}

