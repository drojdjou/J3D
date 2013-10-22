Ship = function(t, bounds) {
    this.transform = t;

    var moveLeft = 0, moveForward = 0, isMoving = 0;

    var r = t.collider.radius;
    var extremes = {};
    extremes.top = -bounds.h + r;
    extremes.bottom = bounds.h - r;
    extremes.left = -bounds.w + r;
    extremes.right = bounds.w - r;
    extremes.initial = bounds.h - r * 10;
    extremes.outscreen = bounds.h + r * 2;

    t.position.z = extremes.outscreen;

    var hspeed = 0.33;
    var vspeed = 0.10;

    var thrustOffset = 0;
    var thrust = false;

    var bank = 0, maxBank = Math.PI * 0.1, bankingSpeed = 0.1;

    var bounce = new v3();
    var screenCoords = { x:0, y:0 };
    var mouseCoords = { x:0, y:0 };

    var autopilot = {
        x:0,
        z:0,
        on: true,
        intime: 2000,
        outtime: 1000,
        waittime: 500
    }

    this.setNormalizedOffset = function(nox, noy) {
        mouseCoords.x = nox; // e.clientX / window.innerWidth;
        mouseCoords.y = noy; // e.clientY / window.innerHeight;
    }

    this.addNormalizedOffset = function(nox, noy) {
        mouseCoords.x += nox; // e.clientX / window.innerWidth;
        mouseCoords.y += noy; // e.clientY / window.innerHeight;

        mouseCoords.x = Math.min(1, mouseCoords.x);
        mouseCoords.x = Math.max(0, mouseCoords.x);

        mouseCoords.y = Math.min(1, mouseCoords.y);
        mouseCoords.y = Math.max(0, mouseCoords.y);
    }

    this.mouseDown = function(e) {
        thrust = true;
    }

    this.mouseUp = function(e) {
        thrust = false;
    }

    this.addBounceForce = function(v) {
        bounce = bounce.add(v);
        bounce = bounce.norm().mul(0.25);
    }

    this.moveIntoPosition = function(delay) {
        if (!delay) delay = 0;

        autopilot.on = true;
        t.position.z = autopilot.z = extremes.outscreen;
        t.rotation.z = 0,t.rotation.y = Math.PI,t.position.x = 0;

        var fu = function() {
            t.position.z = autopilot.z;
        };
        var fc = function() {
            setTimeout(function(a) {
                a.on = false;
            }, autopilot.waittime, this);
        };

        var m = new TWEEN.Tween(autopilot)
            .to({z: extremes.initial}, autopilot.intime)
            .easing(TWEEN.Easing.Quintic.EaseOut)
            .onUpdate(fu).onComplete(fc)
            .delay(delay)
            .start();
    }

    this.gracePeriod = function() {
        return autopilot.on;
    }

    this.move = function() {
        if (autopilot.on) return;

        t.position = t.position.add(bounce);

        screenCoords.x = (t.position.x - extremes.left) / (extremes.right - extremes.left);
        screenCoords.y = (t.position.z - extremes.top) / (extremes.bottom - extremes.top);

        var mx = mouseCoords.x - screenCoords.x;
        var my = (extremes.initial + thrustOffset) - t.position.z;

        moveLeft = mx * hspeed;
        moveForward = my * vspeed;
        bank = mx * maxBank;

        t.position.x += moveLeft;
        t.position.z += moveForward;

        if (t.position.x < extremes.left) t.position.x = extremes.left;
        if (t.position.x > extremes.right) t.position.x = extremes.right;
        if (t.position.z < extremes.top) t.position.z = extremes.top;
        if (t.position.z > extremes.bottom) t.position.z = extremes.bottom;

        var b = bank - bounce.x * 2;

        t.rotation.z += (b * -3.0 - t.rotation.z) * bankingSpeed;
        t.rotation.y += ((Math.PI - b) - t.rotation.y) * bankingSpeed;

        bounce = bounce.mul(0.9);
    }
}