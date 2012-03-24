MathUtil = {};

MathUtil.getBoundsAtDistance = function(camera, distance) {
    var aspect = gl.viewportWidth / gl.viewportHeight;
    var t = Math.tan(camera.fov / 180 * Math.PI / 2);
    var h = distance * t;
    var w = h * aspect;
    return { w : w, h : h };
}