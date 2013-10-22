Loader = function(callback) {
    var assets = {};

    var assetsToLoad = 0;

    var onload = function() {
        assetsToLoad--;
        if (assetsToLoad <= 0) {
            callback.call(null, assets);
        }
    }

    var loadAudioCues = function(path, onLoadedFunc) {
        var cues = [];
        var request = new XMLHttpRequest();
        request.open("GET", path);

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                var t = request.responseText.split(/\r\n|\r|\n/);

                for(var i = 0; i < t.length; i++) {
                    var c = {};
                    var d = t[i].split(/\t/);
                    c.start = d[0];
                    c.end = d[1];
                    c.label = d[2];
                    c.pass = false;
                    cues.push(c);
                }

                onLoadedFunc.call(null, cues);
            }
        }

        request.send();
    }

    var loadAsset = function(name, path, type) {
        assetsToLoad++;

        switch (type) {
            case "json":
                J3D.Loader.loadJSON(path, function(a) {
                    assets[name] = a;
                    onload();
                });
                break;
            case "glsl":
                J3D.Loader.loadGLSL(path, function(a) {
                    assets[name] = a;
                    onload();
                });
                break;
            case "cues":
                loadAudioCues(path, function(a) {
                    assets[name] = a;
                    onload();
                });
                break;
            case "img":
                var i = new Image();
                assets[name] = i;
                i.onLoad = onload;
                i.src = path;
                break;
        }
    }

    loadAsset("mesh", Settings.assetsPath + "assets.json", "json");
    loadAsset("scene", Settings.assetsPath + "assetsScene.json", "json");
    loadAsset("levels", Settings.assetsPath + "levels.json", "json");
    loadAsset("cues", Settings.assetsPath + "cues2.txt", "cues");
    loadAsset("glstar", Settings.assetsPath + "Star.glsl", "glsl");
    loadAsset("oldtv", Settings.assetsPath + "Oldtv.glsl", "glsl");
}

