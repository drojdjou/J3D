J3D.Error = function(n, m) {
    this.name = n;
    this.message = m || "n/a";
}

J3D.ERRORS = {
    "NO_WEBGL_CONTEXT": new J3D.Error("No webgl context", "Looks like your browser does not support webgl :("),
    "NO_CAMERA": new J3D.Error("Missing camera", "Please assign a transform with a camera attached to engine.camera")
};