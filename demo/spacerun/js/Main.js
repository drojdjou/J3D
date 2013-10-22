Main = function() {

    var that = this;
    
    TWEEN.start();

    var game;
    var engine;
    var post;
    var camera, bounds;
    var ship;
    var stardust;
    var rocks, fuels, cargos;

    var paused = false;
    var postprocessRendering = true;

    var canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var song = document.getElementById("song");

    var startDialog = document.getElementById("welcomeScreen");
    var resumeDialog = document.getElementById("resumeDialog");
    var gameOverDialog = document.getElementById("gameOverDialog");

    var bestScore = document.getElementById("bestScore");
    var bestScoreValue = document.getElementById("bestScoreValue");

    if(localStorage["bestScore"] != null) {
        bestScoreValue.innerHTML = localStorage["bestScore"];
    } else {
        bestScore.style.display = "none";
    }

    this.initiate = function() {

        startDialog.style.display = "none";
        gameOverDialog.style.display = "none";
        
        game.setLevel(0);
        rocks.initiate();
        ship.moveIntoPosition();
        fuels.enabled = true;
        cargos.enabled = true;

//        song.volume = 0;
        song.play();
    }

    this.kill = function() {
        that.pause();
    }

    this.pause = function() {

        resumeDialog.style.display = "inline";

        paused = true;
        song.pause();
        J3D.Time.pause();
    }

    this.resume = function() {

        resumeDialog.style.display = "none";
        
        paused = false;
        song.play();
        J3D.Time.resume();
        draw();
    }

    var ongameover = function() {
        fuels.enabled = false;
        cargos.enabled = false;
        rocks.enabled = false;
    }
    
    var onload = function(assets) {
        engine = new J3D.Engine(canvas);

		post = new J3D.Postprocess(engine);

        // console.log(post.engine);

		post.filter = assets.oldtv;
        post.filter.windowHeight = window.innerHeight;
        post.filter.beat = 1.0;

        game = new Game(assets, song, ongameover);

        assets.scene.path = Settings.path;
        J3D.Loader.parseJSONScene(engine, assets.scene, assets.mesh);

        camera = engine.scene.find("camera");
        bounds = J3D.MathUtil.getBoundsAtDistance(camera.camera, Math.abs(camera.position.y));

        stardust = new Stardust(camera, assets.glstar, game);
        engine.scene.add(stardust.transform);

        ship = new Ship(engine.scene.find("ship"), bounds);
        rocks = new Rocks(engine.scene, bounds, game);
        fuels = new Fuels(engine.scene, bounds, game);
        cargos = new Cargos(engine.scene, bounds, game);

        document.onmousemove = onMouseMove;
        document.onmousedown = ship.mouseDown;
        document.onmouseup = ship.mouseUp;
        document.onkeydown = onKeyDown;

        // var serverUrl = 'http://ec2-54-218-0-72.us-west-2.compute.amazonaws.com:7000';
        // var serverUrl = 'http://' + location.host + ':7000';

        // socket = io.connect(serverUrl);
        // socket.on('move', function (data) {
        //     touchFactor = 1;///0.25;
        //     ship.addNormalizedOffset(data.dx  * touchFactor, data.dy  * touchFactor);
        // });

        draw();
    }

    var onMouseMove = function(e) {
        ship.setNormalizedOffset(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    }

    var onKeyDown = function(e) {
        if(e.keyCode == 32) postprocessRendering = !postprocessRendering;
    }

    var draw = function() {
        game.trackBeats();

        stardust.move();
        
        ship.move();

        rocks.move();
        if(!ship.gracePeriod()) rocks.checkCollision(ship);

        fuels.move();
        if(!ship.gracePeriod()) fuels.checkCollision(ship);

        cargos.move(game.isBeat);
        if(!ship.gracePeriod()) cargos.checkCollision(ship);


        if(game.isBeat) post.filter.beat = 1.0;
        else post.filter.beat *= 0.9;

        if(postprocessRendering) post.render();
        else engine.render();

        game.updateState();

        if(game.shipDestroyed()) {
            game.reset();
            ship.moveIntoPosition(Settings.restartDelay);
        }

        if(!paused) requestAnimationFrame(draw);
    }

    var loader = new Loader(onload);


}