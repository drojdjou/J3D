SQR.Mathx = {

    clamp: function(v, s, e) {
        if (v < s) return s;
        if (v > e) return e;
        else return v;
    },

    clamp01: function(v) {
        if (v < 0) return 0;
        if (v > 1) return 1;
        else return v;
    },

    step: function(v, t) {
        return (t >= v) ? 1 : 0;
    }

}