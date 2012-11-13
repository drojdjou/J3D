/**
 Utility used to load multiple assets

 @class AssetLoader can load several files in a batch. It loads JSON, Shaders, Textures and Cubemaps
 */
J3D.AssetLoader = function() {

    var that = this;

    var assetList = [];
    var assetsToLoad;

    this.assets = {};

    /**
     * Add a texture to load.
     *
     * @param name the name used later to refer to the asset
     *
     * @param source The new height of the viewport
     *
     * @param params a collection of params to pass to the texture
     */
    this.addTexture = function(name, source, params) {
        assetList.push({
            name:name,
            type:"texture",
            source:source,
            params:params || null
        });
    }

    /**
     * Add a cubemap to load.
     *
     * @param name the name used later to refer to the asset
     *
     * @param faces a list of 6 path to images representing the 6 faces of a cubemap
     *
     * @param params a collection of params to pass to the cubemap
     */
    this.addCubemap = function(name, faces, params) {
        assetList.push({
            name:name,
            type:"cubemap",
            faces:faces,
            params:params || null
        });
    }

    /**
     * Add a shader file to load.
     *
     * @param name the name used later to refer to the asset
     *
     * @param path path to the GLSL file
     */
    this.addShader = function(name, path) {
        assetList.push({
            name:name,
            type:"shader",
            path:path
        });
    }

    /**
     * Add a JSON file to load.
     *
     * @param name the name used later to refer to the asset
     *
     * @param path path to the JSON file
     */
    this.addJSON = function(name, path) {
        assetList.push({
            name:name,
            type:"json",
            path:path
        });
    }

    /**
     * Add any text file to load.
     *
     * @param name the name used later to refer to the asset
     *
     * @param path path to the text file
     */
    this.addPlainText = function(name, path) {
        assetList.push({
            name:name,
            type:"text",
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

    /**
     * Load all the files added previously to the loader.
     *
     * @param callback A function to invoke when all assets are loaded. An object containing all the assets by name is passed as argument to that function.
     */
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
                default:
                    var f = (function(n) {
                        return function(s) {
                            that.assets[n] = s;
                            onAssetLoadedLC(callback);
                        };
                    })(asset.name);

                    J3D.Loader.loadPlainText(asset.path, f);
                    break;
            }

        }
    }
}