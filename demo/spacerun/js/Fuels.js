Fuels = function(scene, bounds, game) {
    this.fuels = scene.find("fuels");
    this.template = scene.find("fuels/fuel");
    this.fuels.remove(this.template);

    this.bounds = bounds;
    this.game = game;

    var r = this.template.collider.radius;
    this.extremes = {};
    this.extremes.top = -bounds.h - r * 1.6;
    this.extremes.bottom = bounds.h + r * 1.6;

    this.timer = 0;
    this.enabled = false;
}

Fuels.prototype.create = function() {
    this.timer = 0;
    var r = this.template.clone();
    r.rotationSpeed = 0.001;

    r.position.z = this.extremes.top;
    var w = this.bounds.w * 0.9;
    r.position.x = -w + Math.random() * 2 * w;

    this.fuels.add(r);
}

Fuels.prototype.move = function() {

    if(this.enabled) {
        this.timer += J3D.Time.deltaTime;
        if(this.timer > this.game.level.fuelFrequency && !this.game.isGameOver) this.create();
    }

    for (var i = 0; i < this.fuels.numChildren; i++) {
        var r = this.fuels.childAt(i);
        r.rotation.x += r.rotationSpeed * J3D.Time.deltaTime;
        //r.rotation.y += r.rotationSpeed * J3D.Time.deltaTime;
        r.rotation.z += r.rotationSpeed * J3D.Time.deltaTime;

        r.position.z += this.game.level.speed * Settings.fuelSpeedMult;

        if (r.position.z > this.extremes.bottom) {
            this.fuels.remove(r);
        }
    }
}

Fuels.prototype.checkCollision = function(ship) {
    if(this.isGameOver) return;
    
    var s = ship.transform;
    for (var i = 0; i < this.fuels.numChildren; i++) {
        var r = this.fuels.childAt(i);
        var v = r.position.sub(s.position);
        var d = v.mag();
        if (d < s.collider.radius + r.collider.radius && !r.wasHit) {
            r.wasHit = true;

            var ref = this;
            var fls = r;

            var m = new TWEEN.Tween(r.position)
            .to( { y: -1, z: s.position.z, x: s.position.x }, 200)
            .easing(TWEEN.Easing.Quintic.EaseIn)
            .onComplete( function() {
                    ref.fuels.remove(fls);
                    ref.game.onRepair();
            }).start();
        }
    }

}