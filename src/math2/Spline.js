/**
 * @class
 *
 * Defines a spline.
 *
 * How many segments a spline has?
 *
 * Four points define the first curve, where the last point is considered the endpoint
 *
 * Each additional 2 points define the next curve
 * (the endpoint between 1st and next curve is the midpoint between the two last point of the 1st)
 *
 * Cases:
 *
 * 1,2,3,4
 * 1,2,3,c34 + c34,4,5,6
 * 1,2,3,c34 + c34,4,5,c56 + c56,6,7,8
 *
 * So valid number of points are: 4, 6, 8, 10, etc...
 *
 */
SQR.Spline = function(s1, s2, s3, s4) {
    var that = this;

    this.rawPoints = [];
    this.controlPoints = [];

    this.length = 0;
    this.samplingFreq = 3000;

    var numSegments = 1;
    var numRawPoints = 4;
    var closed = false;

    this.rawPoints.push(s1, s2, s3, s4);
    this.controlPoints.push(s1, s2, s3, s4);

    var interpolatedValue = new SQR.V2();

    var findMidpoint = function(a, b) {
        return new SQR.V2().sub(b, a).mul(0.5).appendVec(a);
    }

    var interpolate = function(t, v, func) {

        t = Math.max(t, 0);
        t = Math.min(t, 1);
            
        var s, st;
        var cs = that.controlPoints;

        s = Math.floor(t * numSegments)
        st = (t * numSegments) - s;

        if (s == cs.length / 4) {
            s = Math.max(0, s - 1);
            st = 1;
            st = 1;
        }

        s *= 4;

        v = v || interpolatedValue;
        v.x = func(st, cs[s + 0].x, cs[s + 1].x, cs[s + 2].x, cs[s + 3].x);
        v.y = func(st, cs[s + 0].y, cs[s + 1].y, cs[s + 2].y, cs[s + 3].y);
        return v;
    }

    this.valueAt = function(t, v) {
        return interpolate(t, v, SQR.Interpolation.bezierPosition);
    }

    this.velocityAt = function(t, v) {
        return interpolate(t, v, SQR.Interpolation.bezierVelocity);
    }

    this.recalculateLength = function(dl) {
        dl = dl || this.samplingFreq;
        
        var l = 0;

        var lv = new SQR.V2();

        for(var i = 0; i <= dl; i++) {
            var v = this.valueAt(i / dl);
            if(i > 0) l += lv.sub(v, lv).mag();
            lv.copyFrom(v);
        }

        this.length = l;
    }

    this.findTAtDistance = function(st, distance, freq) {
        freq = freq || 1/this.samplingFreq;

        var sv = this.valueAt(st).clone();
        var d = 0;
        var sm = new SQR.V2();

        var c = 0;

        while(d < distance && c < this.samplingFreq) {
            st += freq;
            st = Math.min(st, 1);
            var v = this.valueAt(st);
            d += sm.sub(sv, v).mag();
            sv.copyFrom(v);
            c++;
        }

        console.log(d, st);

        return st;
    }

    this.add = function(p1, p2) {
        this.rawPoints.push(p1, p2);
        numRawPoints = this.rawPoints.length;
        this.calculateControlPoints();
    }

    this.closePath = function() {
        closed = true;
        this.calculateControlPoints();
    }

    this.calculateControlPoints = function() {

        if (numRawPoints < 4 || numRawPoints % 2 == 1) {
            throw "Spline is corrupt - illegal number of points (should be an even number and >= 4)";
        }

        this.controlPoints = [];
        numSegments = 1;

        for (var i = 0; i < numRawPoints; i++) {

            var r = this.rawPoints[i];

            if (i < 3) {

                if (closed && i == 0) {
                    var l = this.rawPoints[i + 1];
                    var m = findMidpoint(l, r);
                    this.controlPoints.push(m);
                } else {
                    this.controlPoints.push(r);
                }

                continue;
            }

            if (i >= 3 && i % 2 == 0) {
                this.controlPoints.push(r);
                continue;
            }

            if (i >= 3 && i % 2 == 1 && i == numRawPoints - 1 && !closed) {
                this.controlPoints.push(r);
                continue;
            }

            if (i >= 3 && i % 2 == 1 && i < numRawPoints - 1) {
                var l = this.rawPoints[i - 1];
                var m = findMidpoint(r, l);
                this.controlPoints.push(m, m, r);
                numSegments++;
                continue;
            }
        }

        if (closed) {
            var beflast = this.rawPoints[this.rawPoints.length-2];
            var last = this.rawPoints[this.rawPoints.length-1];

            var first = this.rawPoints[0];
            var second = this.rawPoints[1];

            var m1 = findMidpoint(last, beflast);
            var m2 = findMidpoint(first, second);

            this.controlPoints.push(m1, m1, last, first, m2);

            numSegments++;
        }

//        console.log("numSegments", numSegments, "cpl: " + this.controlPoints.length);
    }
}