/**
 Creates a new Scene

 @class A Scene is a hierarchy of transforms. When {@link J3D.Engine.render} is invoked the scene set as the scene property on the engine instance is going to be used for rendering. The J3D.Engine constructor creates an empty scene ready for use.
 */
J3D.Scene = function() {

    var children = [];

    this.numChildren = 0;

    this.add = function() {
        var fa;
        for (var i = 0; i < arguments.length; i++) {
            var t = arguments[i];
            if (!fa) fa = t;
            if (children.indexOf(t) == -1) children.push(t);
            t.parent = null;
            this.numChildren = children.length;
        }
        return fa;
    }

    this.recurse = function(f) {
        for (var i = 0; i < children.length; i++) {
            children[i].recurse(f);
        }
    }

    this.childAt = function(i) {
        return children[i];
    }

    this.contains = function(t) {
        return children.indexOf(t) > -1;
    }

    this.remove = function(t, any) {
        if (this.contains(t)) {
            children.splice(children.indexOf(t), 1);
            this.numChildren = children.length;
            return true;
        } else if (any) {
            for (var i = 0; i < children.length; i++) {
                if (children[i].remove(t)) return true;
            }
        } else {
            return false;
        }
    }

    this.removeAll = function() {
        children = [];
        this.numChildren = 0;
        this.camera = null;
        this.skybox = null;
    }

    this.addSkybox = function(cubemap, shader) {
        this.skybox = new J3D.Transform();
        this.skybox.renderer = shader || J3D.BuiltinShaders.fetch("Skybox");
        this.skybox.renderer.uCubemap = cubemap;
        this.skybox.geometry = J3D.Primitive.Cube(1, 1, 1).flip();
    }

    this.addBackground = function(texture, shader) {
        this.background = new J3D.Transform();
        this.background.renderer = shader || J3D.BuiltinShaders.fetch("Background");
        this.background.renderer.uTexture = texture;
        this.background.geometry = J3D.Primitive.FullScreenQuad();
    }

    /**
     * Set a camera for the scene.
     *
     * A camera is just another J3D.Transform like anything else, but is has the camera attribute set to a valid J3D.Camera object.
     * Even thought it is part of the hierarchy, you need to specify it here so that J3D knows which camera is the POV (there can be multiple cameras in the scene).
     * The camera transform doesn't have to be part of the hierarchy but it is recommended that it is. 
     *
     * @param camera a J3D.Transform cotaining the camera.
     */
    this.setCamera = function(camera) {
        this.camera = camera;
    }

    /**
     * Return a child at a given path or null.
     * @param path Use slash ('/') separated paths to describe the position of the child in hierarchy ex: room/table/leg
     */
    this.find = function(path) {
        var p = path.split("/");

        for (var i = 0; i < this.numChildren; i++) {
            if (this.childAt(i).name == p[0]) {
                if (p.length == 1) return this.childAt(i);
                else return this.childAt(i).find(p.slice(1).join("/"));
            }
        }

        return null;
    }
}
