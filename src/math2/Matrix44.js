SQR.Matrix44 = function() {

    this.data = new Float32Array(16);

    this.identity = function(m) {
        var d = m || this.data;
        d[0] = 1,d[4] = 0,d[8] = 0,d[12] = 0;
        d[1] = 0,d[5] = 1,d[9] = 0,d[13] = 0;
        d[2] = 0,d[6] = 0,d[10] = 1,d[14] = 0;
        d[3] = 0,d[7] = 0,d[11] = 0,d[15] = 1;
    }

    this.transformVector = function (v, pv) {
        var d = this.data;
        var x = v.x, y = v.y, z = v.z, w = v.w;
        pv = pv || v;

        pv.x = d[0] * x + d[4] * y + d[8] * z + d[12] * w;
        pv.y = d[1] * x + d[5] * y + d[9] * z + d[13] * w;
        pv.z = d[2] * x + d[6] * y + d[10] * z + d[14] * w;
        // pv.w = d[3] * x + d[7] * y + d[11] * z + d[15] * w;

        return pv;
    }

    this.multiply = function(m, d) {
        var a = this.data, b = m.data || m;

        var a00, a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12, a13, a14, a15;
        var b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, b12, b13, b14, b15;

        a00 = a[0],a01 = a[1],a02 = a[2],a03 = a[3];
        a04 = a[4],a05 = a[5],a06 = a[6],a07 = a[7];
        a08 = a[8],a09 = a[9],a10 = a[10],a11 = a[11];
        a12 = a[12],a13 = a[13],a14 = a[14],a15 = a[15];

        b00 = b[0],b01 = b[1],b02 = b[2],b03 = b[3];
        b04 = b[4],b05 = b[5],b06 = b[6],b07 = b[7];
        b08 = b[8],b09 = b[9],b10 = b[10],b11 = b[11];
        b12 = b[12],b13 = b[13],b14 = b[14],b15 = b[15];

        a[0] = a00 * b00 + a04 * b01 + a08 * b02 + a12 * b03;
        a[1] = a01 * b00 + a05 * b01 + a09 * b02 + a13 * b03;
        a[2] = a02 * b00 + a06 * b01 + a10 * b02 + a14 * b03;
        a[3] = a03 * b00 + a07 * b01 + a11 * b02 + a15 * b03;

        a[4] = a00 * b04 + a04 * b05 + a08 * b06 + a12 * b07;
        a[5] = a01 * b04 + a05 * b05 + a09 * b06 + a13 * b07;
        a[6] = a02 * b04 + a06 * b05 + a10 * b06 + a14 * b07;
        a[7] = a03 * b04 + a07 * b05 + a11 * b06 + a15 * b07;

        a[8] = a00 * b08 + a04 * b09 + a08 * b10 + a12 * b11;
        a[9] = a01 * b08 + a05 * b09 + a09 * b10 + a13 * b11;
        a[10] = a02 * b08 + a06 * b09 + a10 * b10 + a14 * b11;
        a[11] = a03 * b08 + a07 * b09 + a11 * b10 + a15 * b11;

        a[12] = a00 * b12 + a04 * b13 + a08 * b14 + a12 * b15;
        a[13] = a01 * b12 + a05 * b13 + a09 * b14 + a13 * b15;
        a[14] = a02 * b12 + a06 * b13 + a10 * b14 + a14 * b15;
        a[15] = a03 * b12 + a07 * b13 + a11 * b14 + a15 * b15;

        return this;
    }

    this.setTQS = function(tx, ty, tz, qw, qx, qy, qz, sx, sy, sz, m) {

        var d = m || this.data;
        this.identity(m);

        var sqx = qx * qx;
        var sqy = qy * qy;
        var sqz = qz * qz;

        d[0] = (1 - 2 * sqy - 2 * sqz) * sx;
        d[1] = (2 * qx * qy - 2 * qz * qw) * sx;
        d[2] = (2 * qx * qz + 2 * qy * qw) * sx;

        d[4] = (2 * qx * qy + 2 * qz * qw) * sy;
        d[5] = (1 - 2 * sqx - 2 * sqz) * sy;
        d[6] = (2 * qy * qz - 2 * qx * qw) * sy;

        d[8] = (2 * qx * qz - 2 * qy * qw) * sz;
        d[9] = (2 * qy * qz + 2 * qx * qw) * sz;
        d[10] = (1 - 2 * sqx - 2 * sqy) * sz;

        d[12] = tx;
        d[13] = ty;
        d[14] = tz;

        return m || this;
    }

    this.setTRS = function(tx, ty, tz, rx, ry, rz, sx, sy, sz, m) {

        var d = m || this.data;
        this.identity(m);

        var six = Math.sin(rx), cox = Math.cos(rx), siy = Math.sin(ry), coy = Math.cos(ry), siz = Math.sin(rz), coz = Math.cos(rz);

        // fliping this part changes from left handed to right handed (I think)
        d[0] = (coy * coz + siy * six * siz) * sx;
        d[1] = (-coy * siz + siy * six * coz) * sx;
        d[2] = siy * cox * sx;

        d[4] = siz * cox * sy;
        d[5] = coz * cox * sy;
        d[6] = -six * sy;

        d[8] = (-siy * coz + coy * six * siz) * sz;
        d[9] = (siz * siy + coy * six * coz) * sz;
        d[10] = coy * cox * sz;

        d[12] = tx;
        d[13] = ty;
        d[14] = tz;

        return m || this;
    }

    this.setScale = function(sx, sy, sz, m) {
        var d = m || this.data;
        this.identity(m);
        d[0] = sx,d[5] = sy,d[10] = sz;
        return m || this;
    }

    this.setTranslation = function(tx, ty, tz, m) {
        var d = m || this.data;
        this.identity(m);
        d[12] = tx,d[13] = ty,d[14] = tz;
        return m || this;
    }

    this.setRotation = function(rx, ry, rz, m) {
        var d = m || this.data;
        this.identity(m);
        var sx = Math.sin(rx), cx = Math.cos(rx), sy = Math.sin(ry), cy = Math.cos(ry), sz = Math.sin(rz), cz = Math.cos(rz);

        d[0] = cy * cz + sy * sx * sz;
        d[1] = -cy * sz + sy * sx * cz;
        d[2] = sy * cx;

        d[4] = sz * cx;
        d[5] = cz * cx;
        d[6] = -sx;

        d[8] = -sy * cz + cy * sx * sz;
        d[9] = sz * sy + cy * sx * cz;
        d[10] = cy * cx;

        return m || this;
    }

    this.translate = function(tx, ty, tz) {
        this.setTranslation(tx, ty, tz, SQR.Matrix44.__temp);
        return this.multiply(SQR.Matrix44.__temp);
    }

    this.rotate = function(rx, ry, rz) {
        this.setRotation(rx, ry, rz, SQR.Matrix44.__temp);
        return this.multiply(SQR.Matrix44.__temp);
    }

    this.scale = function(sx, sy, sz) {
        this.setScale(sx, sy, sz, SQR.Matrix44.__temp);
        return this.multiply(SQR.Matrix44.__temp);
    }

    this.copyTo = function(m) {
        var a = this.data, b = m.data || m;
        for (var i = 0; i < 16; i++) b[i] = a[i];
        return m;
    }

    this.copyRotationTo = function(m) {
        var a = this.data, b = m.data || m;

        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];

        b[3] = a[4];
        b[4] = a[5];
        b[5] = a[6];

        b[6] = a[8];
        b[7] = a[9];
        b[8] = a[10];

        return m;
    }

    var noe = function (n) {
        return Math.abs(n) < 0.000001 ? 0 : n;
    };

    this.getAsCSSProperty = function() {
        var d = this.data;
        return 'matrix3d(' +
            noe(d[0]) + ',' +
            noe(d[1]) + ',' +
            noe(d[2]) + ',' +
            noe(d[3]) + ',' +

            noe(d[4]) + ',' +
            noe(d[5]) + ',' +
            noe(d[6]) + ',' +
            noe(d[7]) + ',' +

            noe(d[8]) + ',' +
            noe(d[9]) + ',' +
            noe(d[10]) + ',' +
            noe(d[11]) + ',' +

            noe(d[12]) + ',' +
            noe(d[13]) + ',' +
            noe(d[14]) + ',' +
            noe(d[15]) +
            ')';
    }

    this.extractPosition = function(v) {
        var d = this.data;
        v.set(d[12], d[13], d[14]);
        return v;
    }

    this.determinant = function() {
        var d = this.data;

        return d[0] * (d[5] * d[10] - d[9] * d[6]) +
            d[4] * (d[9] * d[2] - d[1] * d[10]) +
            d[8] * (d[1] * d[6] - d[5] * d[2]);
    }

    /*
     this.inverse = function(m) {
     var d = this.data;
     var a = (m) ? m.data || m : this.data;

     var a00 = d[0], a01 = d[1], a02 = d[2], a03 = d[3],
     a10 = d[4], a11 = d[5], a12 = d[6], a13 = d[7],
     a20 = d[8], a21 = d[9], a22 = d[10], a23 = d[11],
     a30 = d[12], a31 = d[13], a32 = d[14], a33 = d[15],

     b00 = a00 * a11 - a01 * a10,
     b01 = a00 * a12 - a02 * a10,
     b02 = a00 * a13 - a03 * a10,
     b03 = a01 * a12 - a02 * a11,
     b04 = a01 * a13 - a03 * a11,
     b05 = a02 * a13 - a03 * a12,
     b06 = a20 * a31 - a21 * a30,
     b07 = a20 * a32 - a22 * a30,
     b08 = a20 * a33 - a23 * a30,
     b09 = a21 * a32 - a22 * a31,
     b10 = a21 * a33 - a23 * a31,
     b11 = a22 * a33 - a23 * a32,

     det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
     invDet;

     if (Math.abs(det) < 0.0001) {
     console.warn("Attempt to inverse a singular matrix44. ", this.data);
     console.trace();
     return m;
     }

     invDet = 1 / det;

     a[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
     a[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
     a[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
     a[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
     a[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
     a[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
     a[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
     a[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
     a[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
     a[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
     a[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
     a[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
     a[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
     a[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
     a[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
     a[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

     return a;
     };
     */

    this.inverse = function(m) {
        var d = this.data;
        var a = (m) ? m.data || m : this.data;
        var det = this.determinant();

        if (Math.abs(det) < 0.0001) {
            console.warn("Attempt to inverse a singular matrix44. ", this.data);
            console.trace();
            return m;
        }

        var d0 = d[0], d4 = d[4], d8 = d[8],   d12 = d[12],
            d1 = d[1], d5 = d[5], d9 = d[9],   d13 = d[13],
            d2 = d[2], d6 = d[6], d10 = d[10], d14 = d[14];

        det = 1 / det;

        a[0] = (d5 * d10 - d9 * d6) * det;
        a[1] = (d8 * d6 - d4 * d10) * det;
        a[2] = (d4 * d9 - d8 * d5) * det;

        a[4] = (d9 * d2 - d1 * d10) * det;
        a[5] = (d0 * d10 - d8 * d2) * det;
        a[6] = (d8 * d1 - d0 * d9) * det;

        a[8] = (d1 * d6 - d5 * d2) * det;
        a[9] = (d4 * d2 - d0 * d6) * det;
        a[10] = (d0 * d5 - d4 * d1) * det;

        a[12] = - (d12 * a[0] + d13 * a[4] + d14 * a[8]);
        a[13] = - (d12 * a[1] + d13 * a[5] + d14 * a[9]);
        a[14] = - (d12 * a[2] + d13 * a[6] + d14 * a[10]);

        return m;

    }

    this.transpose = function(m) {
        var d = this.data;
        var a = (m) ? m.data || m : this.data;

        var d0 = d[0], d4 = d[4], d8 = d[8],
            d1 = d[1], d5 = d[5], d9 = d[9],
            d2 = d[2], d6 = d[6], d10 = d[10];

        a[0] = d0;
        a[1] = d4;
        a[2] = d8;

        a[4] = d1;
        a[5] = d5;
        a[6] = d9;

        a[8] = d2;
        a[9] = d6;
        a[10] = d10;
    }

    this.lookAt = function (target, up) {
        var d = this.data;
        var x = SQR.Matrix44.__tv1;
        var y = SQR.Matrix44.__tv2;
        var z = SQR.Matrix44.__tv3;

        z.set(d[12], d[13], d[14]);
        z.sub(z, target).norm();
        if (z.magsq() === 0) z.z = 1;

        x.cross(up, z).norm();
        if (x.magsq() === 0) {
            z.x += 0.0001;
            x.cross(up, z).norm();
        }

        y.cross(z, x);

        d[0] = x.x,d[4] = y.x,d[8] = z.x;
        d[1] = x.y,d[5] = y.y,d[9] = z.y;
        d[2] = x.z,d[6] = y.z,d[10] = z.z;

        return this;
    }

    this.identity();
}


















