SQR.Quaternion = function(w, x, y, z) {
    this.set(w, x, y, z);
}

SQR.Quaternion.prototype.set = function(w, x, y, z) {
    this.w = w || 1;
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

SQR.Quaternion.prototype.copyFrom = function(q) {
    this.w = q.w;
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
}

SQR.Quaternion.prototype.identity = function() {
    this.set();
}

/**
 * Multiplies rq (or this if no rq) by q
 * @param q
 * @param rq if not defined this is multiplied by q
 */
SQR.Quaternion.prototype.mul = function(q, rq) {
    rq = rq || this;

    var w = (rq.w * q.w - rq.x * q.x - rq.y * q.y - rq.z * q.z);
    var x = (rq.w * q.x + rq.x * q.w + rq.y * q.z - rq.z * q.y);
    var y = (rq.w * q.y - rq.x * q.z + rq.y * q.w + rq.z * q.x);
    var z = (rq.w * q.z + rq.x * q.y - rq.y * q.x + rq.z * q.w);

    rq.set(w, x, y, z);

    rq.normalize();

    return rq;
}

SQR.Quaternion.prototype.lookAt = function(_dir, _up) {

        var dir = SQR.Quaternion.__tv1;
        var right = SQR.Quaternion.__tv2;
        var up = SQR.Quaternion.__tv3;

        _dir.copyTo(dir);
        _up.copyTo(up);

        dir.norm();

        // If direction is back, the returned quaternion is flipped. Not sure why, but that fixes it.
        if(dir.z == -1) {
            dir.x = 0.0001;
            dir.norm();
        }

        // Probably should do the orthonormalization but not sure how that works :)
        // tangent.sub(up, forward.mul(SQR.V3.dot(forward, up))).norm();

        right.cross(up, dir);
        up.cross(dir, right);

        this.w = Math.sqrt(1 + right.x + up.y + dir.z) * 0.5;
        var rc = 4 * this.w;
        this.x = (dir.y - up.z) / rc;
        this.y = (right.z - dir.x) / rc;
        this.z = (up.x - right.y) / rc;

        this.normalize();
    
        return this;
}

SQR.Quaternion.prototype.fromAngleAxis = function(a, x, y, z) {
    var s = Math.sin(a / 2);
    this.x = x * s;
    this.y = y * s;
    this.z = z * s;
    this.w = Math.cos(a / 2);
}

SQR.Quaternion.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
}

SQR.Quaternion.prototype.normalize = function() {
    var n = this.mag();
    this.x /= n;
    this.y /= n;
    this.z /= n;
    this.w /= n;
}

SQR.Quaternion.prototype.toMatrix = function(m) {
    // Check Matrix44.TQS()
}

SQR.Quaternion.slerp = function(qa, qb, t, qr) {
    qr = qr || new SQR.Quaternion();

    var cha = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
    var ha = Math.acos(cha);
    var sha = Math.sqrt(1 - cha * cha);
    var ra = Math.sin((1 - t) * ha) / sha;
    var rb = Math.sin(t * ha) / sha;

    if (Math.abs(cha) >= 1) {
        // If angle is 0 (i.e cos(a) = 1) just
        // return the first quaternion
        ra = 1;
        rb = 0;
    } else if (Math.abs(sha) < 0.001) {
        // If angle is 180 deg (i.e. sin(a) = 0) there is
        // an infinite amount of possible rotations between those 2
        ra = 0.5;
        rb = 0.5;
    }

    qr.w = (qa.w * ra + qb.w * rb);
    qr.x = (qa.x * ra + qb.x * rb);
    qr.y = (qa.y * ra + qb.y * rb);
    qr.z = (qa.z * ra + qb.z * rb);
    return qr;
}

















