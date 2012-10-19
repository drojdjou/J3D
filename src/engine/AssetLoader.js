J3D.AssetLoader = function() {

    var that = this;

    var assetList = [];
    var assetsToLoad;

    this.assets = {};

    this.addTexture = function(name, source, params) {
        assetList.push({
            name:name,
            type:"texture",
            source:source,
            params:params || null
        });
    }

    this.addCubemap = function(name, faces, params) {
        assetList.push({
            name:name,
            type:"cubemap",
            faces:faces,
            params:params || null
        });
    }

    this.addShader = function(name, path) {
        assetList.push({
            name:name,
            type:"shader",
            path:path
        });
    }

    this.addJSON = function(name, path) {
        assetList.push({
            name:name,
            type:"json",
            path:path
        });
    }

    function onAssetLoaded(callback) {
        assetsToLoad--;
        if (assetsToLoad <= 0) callback(that.assets);
    }

    function replaceOnLoad(p, c) {
        if (!p) p = {};

        var ulf = p.onLoad;
        p.onLoad = function() {
            onAssetLoaded(c);
            if (ulf) ulf();
        }

        return p;

    }

    this.load = function(callback) {
        assetsToLoad = assetList.length;
        var onAssetLoadedLC = onAssetLoaded;

        for (var a in assetList) {
            var asset = assetList[a];

            switch (asset.type) {
                case "texture":
                    this.assets[asset.name] = new J3D.Texture(asset.source, replaceOnLoad(asset.params, callback));
                    break;
                case "cubemap":
                    this.assets[asset.name] = new J3D.Cubemap(asset.faces, replaceOnLoad(asset.params, callback));
                    break;
                case "shader":
                    var f = (function(n) {
                        return function(s) {
                            that.assets[n] = s;
                            onAssetLoadedLC(callback);
                        };
                    })(asset.name);

                    J3D.Loader.loadGLSL(asset.path, f);
                    break;
                case "json":
                    var f = (function(n) {
                        return function(s) {
                            that.assets[n] = s;
                            onAssetLoadedLC(callback);
                        };
                    })(asset.name);
                    
                    J3D.Loader.loadJSON(asset.path, f);
                    break;
            }

        }
    }
}