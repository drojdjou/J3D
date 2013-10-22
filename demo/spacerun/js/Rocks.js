Rocks = function(scene, bounds, game) {
    this.rocks = scene.find("rocks");
    var rock = scene.find("rocks/rock");
    this.rocks.remove(rock);
    this.template = rock;

    this.bounds = bounds;
    this.game = game;

    var r = rock.collider.radius;
    this.extremes = {};
    this.extremes.top = -bounds.h - r * 1.2;
    this.extremes.bottom = bounds.h + r * 1.2;

    this.enabled = true;
}

Rocks.prototype.initiate = function() {
    this.create(12);
    this.create(14);
    this.create(16);
    this.create(18);
    this.create(20);
    this.create(22);
}

Rocks.prototype.reset = function(r) {
    r.position.z = this.extremes.top;
    r.position.x = -this.bounds.w + Math.random() * 2 * this.bounds.w;

    var s = 0.5 + Math.random() * 0.5;
    r.scale.x = s;
    r.scale.y = s;
    r.scale.z = s;

    r.hit = false;
}

Rocks.prototype.create = function(offset) {
    var r = this.template.clone();
    r.rotationSpeed = 0.001 + 0.001 * Math.random();

    this.reset(r);
    r.position.z -= offset;

    this.rocks.add(r);
}

Rocks.prototype.move = function() {
    for (var i = 0; i < this.rocks.numChildren; i++) {
        var r = this.rocks.childAt(i);
        r.rotation.x += r.rotationSpeed * J3D.Time.deltaTime;
        r.rotation.y += r.rotationSpeed * J3D.Time.deltaTime;
        r.rotation.z += r.rotationSpeed * J3D.Time.deltaTime;

        r.position.z += this.game.level.speed;

        if (r.position.z > this.extremes.bottom && this.enabled && !this.game.isGameOver) {
            this.reset(r);
        }
    }
}

Rocks.prototype.checkCollision = function(ship) {
    if(this.isGameOver) return;
    
    var s = ship.transform;
    for (var i = 0; i < this.rocks.numChildren; i++) {
        var r = this.rocks.childAt(i);
        var v = r.position.sub(s.position);
        var d = v.mag();
        if (d < s.collider.radius + r.collider.radius * r.scale.x && !r.hit) {
            r.hit = true;
            v.neg();
            ship.addBounceForce(v);
            this.game.onHit();
        }
    }

}