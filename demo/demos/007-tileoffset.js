registerDemo(function(engine) {

    var sun, cube1, cube2, cube3, cube4, camera;
    var outTexture, overTexture, out6Texture, over6Texture;

    var isInside = true;
    var cs = 5;

    var ray = new J3D.Ray();

    document.title = "Tile & offset | J3D";

    this.setup = function(callback) {
        engine.setClearColor(J3D.Color.white);

        ambient = new J3D.Transform();
        ambient.light = new J3D.Light(J3D.AMBIENT);
        ambient.light.color = new J3D.Color(0.75, 0.75, 0.75, 1);

        outTexture = createTexture("#87b95a", "#1f5a7c");
        overTexture = createTexture("#944d00", "#01b0ea");

        // top, bottom, left, right, front, back
        out6Texture = create6wayTexture(["#999999", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"]);
        over6Texture = create6wayTexture(["#87b95a", "#1f5a7c", "#944d00", "#01b0ea", "#808080", "#000000"]);

        sun = new J3D.Transform();
        sun.light = new J3D.Light(J3D.DIRECT);
        sun.light.color = new J3D.Color(0.75, 0.75, 0.75, 1);
        sun.light.direction = new v3(0, -1, 0).norm();

        gl.disable(gl.CULL_FACE);

        cube1 = new J3D.Transform();
        cube1.position.x = -3 * cs;
        cube1.renderer = J3D.BuiltinShaders.fetch("Gouraud");
        cube1.renderer.textureTile = new v2(0.5, 0.5);
        cube1.renderer.colorTexture = outTexture;
        cube1.renderer.hasColorTexture = true;
        cube1.textureOffset = new v2(0.66, 0.66);

        cube2 = new J3D.Transform();
        cube2.position.x = -1 * cs;
        cube2.renderer = J3D.BuiltinShaders.fetch("Phong");
        cube2.renderer.colorTexture = outTexture;
        cube2.renderer.hasColorTexture = true;

        /*
         *  There are two ways to specify tile and offset values: per renderer and per transform
         *  If settings are specified per transform they override whatever was set per renderer.
         */

        cube2.renderer.textureTile = new v2(4, 4); // <- per renderer (will be used by all objects that share this renderer)
        cube2.textureTile = new v2(2, 2); // <- comment out to use renderers settings above

        cube3 = new J3D.Transform();
        cube3.position.x = 1 * cs;
        cube3.renderer = J3D.BuiltinShaders.fetch("Gouraud");
        cube3.renderer.colorTexture = outTexture;
        cube3.renderer.hasColorTexture = true;

        cube4 = new J3D.Transform();
        cube4.position.x = 3 * cs;
        cube4.renderer = J3D.BuiltinShaders.fetch("Gouraud");
        cube4.renderer.colorTexture = out6Texture;
        cube4.renderer.hasColorTexture = true;

        var cubemesh = J3D.Primitive.Cube(cs, cs, cs);
        cube1.geometry = cubemesh;
        cube2.geometry = cubemesh;
        cube3.geometry = cubemesh;
        cube4.geometry = J3D.Primitive.Cube(cs, cs, cs, true);
        //cube4.geometry.setTransparency(true, gl.ONE, gl.ZERO);
        //cube4.geometry.setTransparency(true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        var cubecollider = J3D.Collider.Mesh(cubemesh);
        cube1.collider = cubecollider;
        cube2.collider = cubecollider;
        cube3.collider = cubecollider;
        cube4.collider = cubecollider;

        camera = new J3D.Transform();
        camera.camera = new J3D.Camera({ fov:30, near:1 });

        camera.position = new v3(2 * cs, 2 * cs, 8 * cs);
        camera.rotation = new v3(Math.PI * -0.075, Math.PI * 0.075, 0);

        engine.scene.setCamera(camera);

        engine.scene.add(camera, sun, ambient, cube1, cube2, cube3, cube4);
        callback();
    }

    function createTexture(ca, cb) {
        var cnv = document.createElement("canvas");
        cnv.width = 256;
        cnv.height = 256;
        var ctx = cnv.getContext("2d");

        ctx.fillStyle = ca;
        ctx.fillRect(0, 0, 128, 128);
        ctx.fillRect(128, 128, 128, 128);

        ctx.fillStyle = cb;
        ctx.fillRect(128, 0, 128, 128);
        ctx.fillRect(0, 128, 128, 128);

        return new J3D.Texture(cnv);
    }

    function create6wayTexture(cs) {
        var cnv = document.createElement("canvas");
        cnv.width = 256;
        cnv.height = 384;
        var ctx = cnv.getContext("2d");

        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(0, 0, 256, 384);

        var m = 16;

        for (var i = 0; i < 6; i++) {
            ctx.fillStyle = cs[i];
            ctx.fillRect(i % 2 * 128 + m, Math.floor(i / 2) * 128 + m, 128 - m * 2, 128 - m * 2);
        }

        return new J3D.Texture(cnv);
    }

    this.render = function(interactor) {
        cube1.rotation.x += Math.PI * J3D.Time.deltaTime / 12000;
        cube1.rotation.y -= Math.PI * J3D.Time.deltaTime / 6000;

        cube2.rotation.x -= Math.PI * J3D.Time.deltaTime / 10000;
        cube2.rotation.y += Math.PI * J3D.Time.deltaTime / 7000;

        cube3.rotation.x += Math.PI * J3D.Time.deltaTime / 13000;
        cube3.rotation.y -= Math.PI * J3D.Time.deltaTime / 5000;

        cube4.rotation.x += Math.PI * J3D.Time.deltaTime / 4000;
        cube4.rotation.y -= Math.PI * J3D.Time.deltaTime / 12000;

        // tile and offset can be animated as well
        var a = Math.sin(J3D.Time.time);
        cube3.textureTile.x = cube3.textureTile.y = 2 + a;
        cube3.textureOffset.x = cube3.textureOffset.y = -a / 2;

        ray = J3D.Ray.fromMousePosition(interactor.pageX, interactor.pageY, camera, null, ray);

        var c1h = J3D.Intersection.rayTest(ray, cube1);
        var c2h = J3D.Intersection.rayTest(ray, cube2);
        var c3h = J3D.Intersection.rayTest(ray, cube3);
        var c4h = J3D.Intersection.rayTest(ray, cube4);

        cube1.renderer.colorTexture = (c1h) ? overTexture : outTexture;
        cube2.renderer.colorTexture = (c2h) ? overTexture : outTexture;
        cube3.renderer.colorTexture = (c3h) ? overTexture : outTexture;
        cube4.renderer.colorTexture = (c4h) ? over6Texture : out6Texture;

        engine.render();
    }

    return this;
});