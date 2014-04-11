// Based on http://natureofcode.com/book/chapter-3-oscillation/
SQR.Spring = function(_anchor) {

    this.anchor = _anchor || new SQR.V2();
    this.location = this.anchor.clone();

    this.acceleration = this.anchor.clone();
    this.velocity = this.anchor.clone();

    this.friction = 0.85;
    this.k = 0.1;

    var x = 0;

    this.update = function() {
        this.acceleration.sub(this.location, this.anchor);
        x = this.acceleration.mag();
        this.acceleration.norm().mul(-this.k * x);

        this.velocity.add(this.velocity, this.acceleration);
        this.velocity.mul(this.friction);
        this.location.add(this.location, this.velocity);
    }
}