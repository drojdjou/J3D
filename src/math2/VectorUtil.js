/**
 * @class
 *
 * A collection of static functions to work with vectors
 * 
 */
SQR.VectorUtil = {

    /**
     * Based on http://www.math.tamu.edu/~romwell/arcball_js/arcball.pde
     *
     * @param mx mouse X position in range [ -1 , 1 ]
     * @param my mouse Y position in range [ -1 , 1 ]
     * @param radius of the arc ball for interaction. Default value: 0.5
     */
    mouseToUnitSphereVector: function(mx, my, gr, v) {
        gr = gr || 0.5;
        v = v || new SQR.V3();

        var px = mx / gr;
        var py = my / gr;
        var rl = px * px + py * py;

        if (rl >= 1) {
            v.set(px, py, 0);
        } else {
            v.set(px, py, Math.sqrt(1 - rl));
        }

        v.norm();

        return v;
    }
}

SQR.Quaternion.__tv1 = new SQR.V3();
SQR.Quaternion.__tv2 = new SQR.V3();
SQR.Quaternion.__tv3 = new SQR.V3();

SQR.Matrix2D.__temp = new Float32Array(9);
SQR.Matrix33.__temp = new Float32Array(9);
SQR.Matrix44.__temp = new Float32Array(16);

SQR.Matrix44.__tv1 = new SQR.V3();
SQR.Matrix44.__tv2 = new SQR.V3();
SQR.Matrix44.__tv3 = new SQR.V3();

SQR.VectorUtil.__tv1 = new SQR.V3();
SQR.VectorUtil.__tv2 = new SQR.V3();
SQR.VectorUtil.__tv3 = new SQR.V3();