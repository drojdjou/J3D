registerDemo(function(engine) {

    var cube, q1, q2;
    
    this.setup = function(callback) {
        engine.setClearColor(J3D.Color.black);

        var ambient = new J3D.Transform();
        ambient.light = new J3D.Light(J3D.AMBIENT);
        ambient.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);

        var light = new J3D.Transform();
        light.light = new J3D.Light(J3D.DIRECT);
        light.light.color = new J3D.Color(0.5, 0.5, 0.5, 1);
        light.rotation = new v3(-Math.PI, 0, Math.PI);

        cube = new J3D.Transform('cube');

        cube.useQuaternion = true;

        q1 = quat4.create();
        q2 = quat4.create();

        cube.geometry = J3D.Primitive.Cube(1, 1, 1);
        cube.renderer = J3D.BuiltinShaders.fetch("Normal2Color");
        // cube.renderer.color = new J3D.Color(1, 0, 0, 1);

        // Alternative way of doing animation
//        var animdata = J3D.AnimationUtil.createAnimationData(['rx', 'ry']);
//
//        animdata.wrapMode = J3D.Animation.LOOP;
//        animdata.length = 4;
//        animdata.samplingRate = 0.01;
//        animdata.autoPlay = true;
//        animdata.numSamples = animdata.length / animdata.samplingRate;
//
//        animdata.autoPlay = true;
//        for (var i = 0; i <= animdata.numSamples; i += 1) {
//            var t = i / animdata.numSamples;
//            t = t * t * (3 - 2 * t);
//            animdata.properties.rx.push(Math.PI * t * 2.0);
//            animdata.properties.ry.push(Math.PI * t * 4.0);
//        }
//        cube.animation = new J3D.Animation(animdata);

        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 4;

        engine.scene.setCamera(camera);
        engine.scene.add(camera, cube, light, ambient);

        callback();
    }

    var qa1 = 0, qa2 = 0;

    this.render = function(interactor) {

//        cube.rotation.x += Math.PI * J3D.Time.deltaTime / 6000;
//        cube.rotation.y += Math.PI / 2 * J3D.Time.deltaTime / 3000;

        qa1 += Math.PI * J3D.Time.deltaTime / 6000;
        qa2 += Math.PI / 2 * J3D.Time.deltaTime / 3000;

        quat4.fromAngleAxis(qa1, [1,0,0], q1);
        quat4.fromAngleAxis(qa2, [0,1,0], q2);

        quat4.multiply(q1, q2, cube.rotationq);

        engine.render();
    }
});