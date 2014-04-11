SQR.Interpolation = {

    bezierPosition: function(t, p0, c0, c1, p1) {
        return p0 * (1 - t) * (1 - t) * (1 - t) +
            c0 * 3 * t * (1 - t) * (1 - t) +
            c1 * 3 * t * t * (1 - t) +
            p1 * t * t * t;
    },

    bezierVelocity: function(t, p0, c0, c1, p1) {
        return (3 * c0 - 3 * p0)
            + 2 * (3 * p0 - 6 * c0 + 3 * c1) * t
            + 3 * (-p0 + 3 * c0 - 3 * c1 + p1) * t * t;
    },

    linear: function(e0, e1, t) {
        if(t <= e0) return e0;
        if(t >= e1) return e1;

        t = (t - e0) / (e1 - e0);

        return e0 + (e1 - e0) * t;
    },
    
    smoothStep: function(e0, e1, t) {
        if(t <= e0) return e0;
        if(t >= e1) return e1;

        t = (t - e0) / (e1 - e0);

        return e0 + (e1 - e0) * (3 * t * t - 2 * t * t * t);
    },

    quadIn: function (t) {
        return t * t;
    },

    quadOut: function (t) {
        return t * (2 - t);
    },

    quadInOut: function (t) {
        if (( t *= 2 ) < 1)
            return 0.5 * t * t;
        else
            return -0.5 * ( --t * ( t - 2 ) - 1 );
    }

};