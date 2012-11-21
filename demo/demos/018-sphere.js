registerDemo(function(engine) {

    var earth, camera, root, sun, clouds;
    var mx = 0, my = 0;
    var isHovered = false;
    var bsrX = 0, csrX = 0, bsrY = 0, csrY = 0;
    var isDown = false;
    var dx = 0, dy = 0;

    var pin;

    document.title = "Sphere | J3D v0.24";

    this.setup = function(callback) {
        var assetsLoader = new J3D.AssetLoader();

        assetsLoader.addShader("earthShader", "../demo/shaders/EarthShader.glsl");
        assetsLoader.addShader("cloudShader", "../demo/shaders/EarthCloudShader.glsl");

        assetsLoader.addTexture("color", "models/textures/earth/color.jpg");
        assetsLoader.addTexture("night", "models/textures/earth/night.jpg");
        assetsLoader.addTexture("specular", "models/textures/earth/specular.jpg");
        assetsLoader.addTexture("clouds", "models/textures/earth/clouds.jpg");
        assetsLoader.addTexture("normal", "models/textures/earth/normal.png");

        assetsLoader.load(function(a) {
            onAssets(a, callback)
        });
    }

    function onAssets(assets, callback) {
        root = new J3D.Transform();

        camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 100;
        engine.scene.setCamera(camera);
        root.add(camera);

        light2 = new J3D.Transform();
        light2.light = new J3D.Light(J3D.HEMISPHERE);
        light2.light.color = new J3D.Color(1, 1, 1, 1);
        light2.position = new v3(-1000, 0, 0);
        light2.light.direction = new v3(1, 0, 0);
        light2.light.angleFalloff = 0.15;

        earth = new J3D.Transform();
        earth.rotation.y = Math.PI;
        earth.renderer = assets.earthShader;
        earth.renderer.dayTexture = assets.color;
        earth.renderer.nightTexture = assets.night;
        earth.renderer.specularMap = assets.specular;
        earth.renderer.normalMap = assets.normal;
        earth.renderer.specularIntensity = 2.0; // 1.1;
        earth.renderer.shininess = 5; // 10;
        earth.renderer.invRadius = -1; // 10;
        earth.geometry = J3D.Primitive.Sphere(30, 40, 40);
        earth.collider = J3D.Collider.Sphere(30);

        clouds = new J3D.Transform();
        clouds.renderer = assets.cloudShader;
        clouds.renderer.cloudTexture = assets.clouds;
        clouds.renderer.cloudIntensity = 0.9;
        clouds.geometry = J3D.Primitive.Sphere(31, 40, 40);
        clouds.geometry.setTransparency(true, gl.SRC_ALPHA, gl.DST_ALPHA);

//        var lat, lon;

//        // Los Angeles - 34.0522° N  118.2428° W
//        lat = (90 - 34.0522) / 180 * Math.PI;
//        lon = (-118.2428 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // New York 40.7142° N, 74.0064° W
//        lat = (90 - 40.7142) / 180 * Math.PI;
//        lon = (-74.0064 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // Paris 48.8742° N, 2.3470° E
//        lat = (90 - 48.8742) / 180 * Math.PI;
//        lon = (2.3470 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // London 51.5171° N, 0.1062° W
//        lat = (90 - 51.5171) / 180 * Math.PI;
//        lon = (0.1062 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // Singapore 1.3667° N, 103.7500° E
//        lat = (90 - 1.3667) / 180 * Math.PI;
//        lon = (103.7500 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // Tokyo 35.6833° N, 139.7667° E
//        lat = (90 - 35.6833) / 180 * Math.PI;
//        lon = (139.7667 + 180) / 180 * Math.PI;
//        addPin(lat, lon);
//
//        // Sydney 33.8683° S, 151.2086° E
//        lat = (90 + 33.8683) / 180 * Math.PI;
//        lon = (151.2086 + 180) / 180 * Math.PI;
//        addPin(lat, lon);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = (90 - position.coords.latitude) / 180 * Math.PI;
                lon = (position.coords.longitude + 180) / 180 * Math.PI;
                addPin(lat, lon, J3D.Color.red);
            });
        }

        engine.scene.add(earth, light2, root);
        engine.scene.add(clouds);

        document.onmousemove = onMouseMove;
        document.onmousedown = onMouseDown;
        document.onmouseup = onMouseUp;
        window.onscroll = onScroll;

        callback();
    }

    function onScroll(e) {
        var z = camera.position.z + window.pageYOffset * 0.25;
        z = Math.min(500, z);
        z = Math.max(70, z);
        camera.position.z = z;
    }

    function onMouseMove(e) {
        mx = e.clientX;
        my = e.clientY;

        if (isDown) {
            csrX = -( ((mx / window.innerWidth) * 2 - 1) - dx );
            csrY = -( ((my / window.innerHeight) * 2 - 1) - dy );
        }
    }

    function onMouseDown(e) {
        if (isHovered) {
            isDown = true;
            dx = (e.clientX / window.innerWidth) * 2 - 1;
            dy = (e.clientY / window.innerHeight) * 2 - 1;
        }
    }

    function onMouseUp(e) {

        if (isDown) {
            bsrX += csrX;
            csrX = 0;
            bsrY += csrY;
            csrY = 0;
        }

        isDown = false;
    }

    this.render = function() {
        var r = J3D.Ray.fromMousePosition(mx, my, camera);
        isHovered = J3D.Intersection.rayTest(r, earth) > 0;

        document.body.style.cursor = (isHovered) ? "move" : "auto";

        root.rotation.y = -0.5 + bsrX + csrX;
        root.rotation.x = Math.max(-0.5, Math.min(0.5, bsrY + csrY));

        if (!isDown) {
            earth.rotation.y += J3D.Time.deltaTime * 0.0001;
            clouds.rotation.y += J3D.Time.deltaTime * 0.00011;
        }

        engine.render();
    }

    function addPin(lat, lon, color) {
        var pin = new J3D.Transform();
        pin.renderer = J3D.BuiltinShaders.fetch("Phong");
        pin.renderer.color = color || J3D.Color.red;

        pin.geometry = J3D.Primitive.Cube(0.25, 0.25, 2);

        var radius = 30;

        pin.position.x = -radius * Math.cos(lon) * Math.sin(lat);
        pin.position.y = radius * Math.cos(lat);
        pin.position.z = radius * Math.sin(lon) * Math.sin(lat);

        earth.add(pin);

        pin.matrixMode = true;

        var lam = mat4.identity();
        mat4.lookAt2(v3.ZERO(), pin.position.norm(), v3.UP(), lam);
        mat4.translate(lam, [0, 0, -radius], lam);
        pin.matrix = lam;
    }
});