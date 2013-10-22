Cargos = function(scene, bounds, game) {
    this.cargos = scene.find("cargos");
    this.template = scene.find("cargos/cargo");
    this.cargos.remove(this.template);

    this.bounds = bounds;
    this.game = game;

    var r = this.template.collider.radius;
    this.extremes = {};
    this.extremes.top = -bounds.h - r * 1.2;
    this.extremes.bottom = bounds.h + r * 1.2;

    this.timer = 0;
    this.enabled = false;

    this.extraScale = 1;
}

Cargos.prototype.create = function() {
    this.timer = 0;
    var r = this.template.clone();
    r.rotationSpeed = 0.001;

    r.position.z = this.extremes.top;
    var w = this.bounds.w * 0.9;
    r.position.x = -w + Math.random() * 2 * w;

    this.cargos.add(r);
}

Cargos.prototype.move = function(isBeat) {

    if(isBeat) this.extraScale = 0.5;

    if(this.enabled) {
        this.timer += J3D.Time.deltaTime;
        if(this.timer > this.game.level.cargoFrequency && !this.game.isGameOver) this.create();
    }

    for (var i = 0; i < this.cargos.numChildren; i++) {
        var r = this.cargos.childAt(i);
        r.rotation.x += r.rotationSpeed * J3D.Time.deltaTime;
        //r.rotation.y += r.rotationSpeed * J3D.Time.deltaTime;
        r.rotation.z += r.rotationSpeed * J3D.Time.deltaTime;

        r.position.z += this.game.level.speed * Settings.cargoSpeedMult;

        r.scale.x = r.scale.y = r.scale.z = 1 + this.extraScale;
        this.extraScale *= 0.95;

        if (r.position.z > this.extremes.bottom) {
            this.cargos.remove(r);
        }
    }
}

Cargos.prototype.checkCollision = function(ship) {
    if(this.isGameOver) return;

    var s = ship.transform;
    for (var i = 0; i < this.cargos.numChildren; i++) {
        var r = this.cargos.childAt(i);
        var v = r.position.sub(s.position);
        var d = v.mag();
        if (d < s.collider.radius + r.collider.radius && !r.wasHit) {

            r.wasHit = true;

            var ref = this;
            var cgr = r;

            var m = new TWEEN.Tween(r.position)
            .to( { y: -1, z: s.position.z, x: s.position.x }, 200)
            .easing(TWEEN.Easing.Quintic.EaseIn)
            .onComplete( function() {
                    ref.cargos.remove(cgr);
                    ref.game.onCargo();
            }).start();
            
        }
    }

}




























