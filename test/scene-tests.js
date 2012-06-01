TestCase("engine_defcanvas", {

    setUp:function() {
        this.engine = new J3D.Engine();
    },

    testEngine:function() {
        assertNotUndefined("engine was not initialized", this.engine);
        assertNotUndefined("gl was not initialized", gl);
        assertEquals("Wrong resolution", this.engine.resolution, 1);
        assertEquals("Wrong default canvas width", window.innerWidth, gl.viewportWidth);
        assertEquals("Wrong default canvas height", window.innerHeight, gl.viewportHeight);
    },

    tearDown:function() {
        this.engine = null;
        if (gl) {
            gl = null;
            gl = undefined;
        }
    }
});

TestCase("nowebgl", {
    testNowebgl:function() {
         assertEquals("Dummy test failed!", 1, 1);
    }
})

TestCase("scene", {

    setUp:function() {
        this.engine = new J3D.Engine();
    },

    testScene:function() {
        assertNotUndefined("engine was not initialized", this.engine);
        
        assertEquals("Wrong number of children", 0, this.engine.scene.numChildren);

        var t = new J3D.Transform();
        this.engine.scene.add(t);
        assertEquals("Wrong number of children", 1, this.engine.scene.numChildren);

        this.engine.scene.add(t);
        assertEquals("Wrong number of children", 1, this.engine.scene.numChildren);

        assertTrue("Incorrect result from scene.contains", this.engine.scene.contains(t));

        this.engine.scene.remove(t);
        assertEquals("Wrong number of children", 0, this.engine.scene.numChildren);

        for (var i = 0; i < 200; i++) {
            this.engine.scene.add(new J3D.Transform());
        }
        assertEquals("Wrong number of children", 200, this.engine.scene.numChildren);

        this.engine.scene.removeAll();
        assertEquals("Wrong number of children", 0, this.engine.scene.numChildren);
    },

    testSceneLookup:function() {
        var n1 = "root", n2 = "child", n3 = "grandChild";

        var p;

        var t = new J3D.Transform();
        t.name = n1;
        var t2 = new J3D.Transform(n2);
        var t3 = new J3D.Transform(n3);


        this.engine.scene.add(t);
        t.add(t2);
        t2.add(t3);

        assertNotNull("scene.find returns null on level 1", this.engine.scene.find(n1));
        assertEquals("scene.find returns wrong object on level 1", t.name, this.engine.scene.find(n1).name);

        assertNotNull("transform.find returns null on level 1", t.find(n2));
        assertEquals("transform.find returns wrong object on level 1", t2.name, t.find(n2).name);

        p = n1 + "/" + n2;
        assertNotNull("scene.find returns null on level 2", this.engine.scene.find(p));
        assertEquals("scene.find returns wrong object on  level 2", t2.name, this.engine.scene.find(p).name);
        assertEquals("transform.path invalid result", p, t2.path());

        p = n1 + "/" + n2 + "/" + n3;
        assertNotNull("scene.find returns null on level 2", this.engine.scene.find(p));
        assertEquals("scene.find returns wrong object on  level 2", t3.name, this.engine.scene.find(p).name);
        assertEquals("transform.path invalid result", p, t3.path());

        p = n2 + "/" + n3;
        assertNotNull("transform.find returns null on level 2", t.find(p));
        assertEquals("transform.find returns wrong object on level 2", t3.name, t.find(p).name);
    },

    testRendering:function() {
        var i;

        var r = J3D.BuiltinShaders.fetch("Phong");
        var r2 = J3D.BuiltinShaders.fetch("Gouraud");
        var g = J3D.Primitive.Cube(1, 1, 1);

        for (i = 0; i < 3; i++) {

            var t1 = new J3D.Transform("l1_" + i);
            t1.renderer = r;
            t1.geometry = g;

            for (var j = 0; j < 3; j++) {

                var t2 = new J3D.Transform("l2_" + j);
                t2.renderer = r2;
                t2.geometry = g;

                t1.add(t2);
            }

            this.engine.scene.add(t1);
        }

        assertException("Missing camera", this.engine.render, J3D.ERRORS.NO_CAMERA.name);

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 4;
        this.engine.camera = camera;

        assertEquals("Children count", 3, this.engine.scene.numChildren);

        for (i = 0; i < 3; i++) {
            this.engine.render();
            assertEquals("Opaque meshes count", 3 + 3 * 3, this.engine._opaqueMeshes.length);
            assertEquals("Shader count ", 2, this.engine.shaderAtlas.shaderCount);
        }
    },

    tearDown:function() {
        this.engine.destroy();
        this.engine = null;
        if (gl) {
            gl = null;
            gl = undefined;
        }
    }
})