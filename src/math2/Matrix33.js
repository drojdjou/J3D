SQR.Matrix33 = function() {

    this.data = new Float32Array(9);

    this.identity = function() {
        var d = this.data;
        d[0] = 1,d[3] = 0,d[6] = 0;
        d[1] = 0,d[4] = 1,d[7] = 0;
        d[2] = 0,d[5] = 0,d[8] = 1;
        return this;
    }

    this.transformVector = function (v, pv) {
        var d = this.data;
        var x = v.x, y = v.y, z = v.z, w = v.w;
        pv = pv || v;

        pv.x = d[0] * x + d[3] * y + d[6] * z;
        pv.y = d[1] * x + d[4] * y + d[7] * z;
        pv.z = d[2] * x + d[5] * y + d[8] * z;

        return pv;
    }

    this.determinant = function() {
        var d = this.data;

        return d[0] * (d[4] * d[8] - d[7] * d[5]) +
               d[3] * (d[7] * d[2] - d[1] * d[8]) +
               d[6] * (d[1] * d[5] - d[4] * d[2]);
    }

    this.inverse = function(m) {
        var d = this.data;
        m = m || this.data;

        var a00 = d[0], a01 = d[1], a02 = d[2],
            a10 = d[3], a11 = d[4], a12 = d[5],
            a20 = d[6], a21 = d[7], a22 = d[8],

            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,

            d = a00 * b01 + a01 * b11 + a02 * b21,
            id;

        if (!d) {
            console.warn("Attempt to inverse a singular matrix44. ", this.data);
            return m;
        }
        
        id = 1 / d;

        m[0] = b01 * id;
        m[1] = (-a22 * a01 + a02 * a21) * id;
        m[2] = (a12 * a01 - a02 * a11) * id;
        m[3] = b11 * id;
        m[4] = (a22 * a00 - a02 * a20) * id;
        m[5] = (-a12 * a00 + a02 * a10) * id;
        m[6] = b21 * id;
        m[7] = (-a21 * a00 + a01 * a20) * id;
        m[8] = (a11 * a00 - a01 * a10) * id;

        return m;

    }

    this.transpose = function() {
        var d = this.data;

        var d0 = d[0], d3 = d[3], d6 = d[6],
            d1 = d[1], d4 = d[4], d7 = d[7],
            d2 = d[2], d5 = d[5], d8 = d[8];

        d[0] = d0;
        d[1] = d3;
        d[2] = d6;

        d[3] = d1;
        d[4] = d4;
        d[5] = d7;

        d[6] = d2;
        d[7] = d5;
        d[8] = d8;
    }

}