/**
 * Animation data structure is the following:
 *
 * {
 *     "length": 1, // in seconds
 *     "wrapMode": "once" (default) || "loop",
 *     "times": [12, 3, 4],
 *     "properties": {
 *         "px": [4.34, 3.54, 2.65, 4.65, 2.342, 1.87...],
 *         "py": [...],
 *         ...
 *     }
 * }
 *
 *
 * @param data A set of animation data.
 */
J3D.Animation = function(data) {

    var isPlaying = false;

    var startTime = 0;
    var currentTime = 0;
    var loopCount = 0;

    if (!data.wrapMode) data.wrapMode == J3D.Animation.ONCE;

    this.play = function() {
        startTime = J3D.Time.time;
        currentTime = 0;
        isPlaying = true;
        loopCount = 0;
    }

    /**
     * If the transform has useQuaternions set to true it will expect quaternions animation data,
     * otherwise it will expect euler angles.
     * A transform using quaternion can't be animated with euler angles and vice-versa.
     *
     * @param transform
     */
    this.animateTransform = function(transform) {
        if (!isPlaying) return;

        currentTime = (J3D.Time.time - startTime);

        if (data.wrapMode == J3D.Animation.ONCE) {
            if (currentTime > data.length) {
                isPlaying = false;
                return;
            }
        } else if (data.wrapMode == J3D.Animation.LOOP) {
            var c = (currentTime / data.length) | 0;
            if (c > loopCount) {
                loopCount = c;
            }

            currentTime = currentTime % data.length;
        }

        var a = (currentTime / data.samplingRate) | 0;
        var b = (a == data.numSamples - 1) ? 0 : a + 1;
        var t = (currentTime % data.samplingRate) / data.samplingRate;

//        if(a >= data.numSamples-1 || a == 0) console.log(a, b, t);

        var dp = data.properties;

        var tp = transform.position;
        if (dp.px) tp.x = interpolate('px', a, b, t);
        if (dp.py) tp.y = interpolate('py', a, b, t);
        if (dp.pz) tp.z = interpolate('pz', a, b, t);

        
        if (data.quaternions) {
            var tq = transform.rotationq;
            if (dp.rx) tq[0] = interpolate('rx', a, b, t);
            if (dp.ry) tq[1] = interpolate('ry', a, b, t);
            if (dp.rz) tq[2] = interpolate('rz', a, b, t);
            if (dp.rw) tq[3] = interpolate('rw', a, b, t);
        } else {
            // Do not interpolate euler angles!
            var tr = transform.rotation;
            if (dp.rx) tr.x = interpolate('rx', a, b, 0);
            if (dp.ry) tr.y = interpolate('ry', a, b, 0);
            if (dp.rz) tr.z = interpolate('rz', a, b, 0);
        }

    }

    var interpolate = function(p, a, b, t) {
        var ps = data.properties;
        return ps[p][a] + (ps[p][b] - ps[p][a]) * t;
    }

    this.animateShader = function(shader) {

    }

    if (data.autoPlay) this.play();
}

J3D.Animation.PX = 'px';
J3D.Animation.PY = 'py';
J3D.Animation.PX = 'pz';

J3D.Animation.RX = 'rx';
J3D.Animation.RY = 'ry';
J3D.Animation.RZ = 'rz';

J3D.Animation.SX = 'sx';
J3D.Animation.SY = 'sy';
J3D.Animation.SZ = 'sz';

J3D.Animation.QX = 'qx';
J3D.Animation.QY = 'qy';
J3D.Animation.QZ = 'qz';
J3D.Animation.QW = 'qw';

J3D.Animation.ONCE = 'once';
J3D.Animation.LOOP = 'loop';
// J3D.Animation.PINGPONG = 'pingpong'; //Not implemented yet