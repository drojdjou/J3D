SQR.QuadraticBezier = function(_p0, _c0, _c1, _p1) {

    if(!_p0 || !_c0 && !_c1 || !_p1) throw("Failed to create cruve: 4 2D|3D vectors are required.");

    this.p0 = _p0;
    this.c0 = _c0;
    this.c1 = _c1;
    this.p1 = _p1;

    // This way it's the same type as the points (V2 or V3)
    var interpolatedValue = _p0.clone().set();

    var pfunc = SQR.Interpolation.bezierPosition;
    var vfunc = SQR.Interpolation.bezierVelocity;

    this.velocityAt = function(t, v) {
        v = v || interpolatedValue;
        v.x = vfunc(t, this.p0.x, this.c0.x, this.c1.x, this.p1.x);
        v.y = vfunc(t, this.p0.y, this.c0.y, this.c1.y, this.p1.y);

        if(v.z && this.p0.z) {
            v.z = vfunc(t, this.p0.z, this.c0.z, this.c1.z, this.p1.z);
        }

        return v;
    }

    this.valueAt = function(t, v) {
        v = v || interpolatedValue;
        v.x = pfunc(t, this.p0.x, this.c0.x, this.c1.x, this.p1.x);
        v.y = pfunc(t, this.p0.y, this.c0.y, this.c1.y, this.p1.y);

        if(v.z != null && this.p0.z != null) {
            v.z = pfunc(t, this.p0.z, this.c0.z, this.c1.z, this.p1.z);
        }
        
        return v;
    }

    this.createSegment = function(numVertices, geometry) {
        var g = geometry || new SQR.Geometry();
        g.continous = true;

        g.vertices = g.vertices || [];
        g.tangents = g.tangents || [];

        for(var i = 0; i <= numVertices; i++) {
            var t = i / numVertices;
            g.vertices.push(this.valueAt(t, new SQR.V3()));
            g.tangents.push(this.velocityAt(t, new SQR.V3()));
        }

        return g;
    }

    /**
     * This function assumes it is a 3D curve (i.e control points are of type SQR.V3)

     * @param numVertices The number of polygons the ribbon will have
     * @param width The width of the ribbon
     * @param up The vector up
     */
    this.createRibbon = function(numVertices, width, color, geometry) {
        var g = geometry || new SQR.Geometry();
        
        for(var i = 0; i < numVertices; i++) {

            var t1 = (i) / numVertices;
            var t2 = (i + 1) / numVertices;

            var p1 = this.valueAt(t1, new SQR.V3());
            var p2 = this.valueAt(t2, new SQR.V3());

            var v1 = this.velocityAt(t1, new SQR.V3()).norm();
            var v2 = this.velocityAt(t2, new SQR.V3()).norm();

            var up = new SQR.V3();
            up.cross(v1, v2).norm();

            var n1 = new SQR.V3();
            n1.cross(v1, up);

            var n2 = new SQR.V3();
            n2.cross(v2, up);

            n1.mul(width * 0.5);
            n2.mul(width * 0.5);

            var a = new SQR.V3();
            var b = new SQR.V3();
            var c = new SQR.V3();
            var d = new SQR.V3();

            a.add(p1, n1);
            b.add(p1, n1.neg());

            c.add(p2, n2);
            d.add(p2, n2.neg());


            g.color = color;

//            g.addQuad(a, b, d, c, color);
//            g.addQuad(d, b, a, c, color);

            g.addTriangle(a, c, b, color);
            g.addTriangle(c, b, d, color);

            g.addTriangle(a, b, c, color);
            g.addTriangle(c, d, b, color);
        }

        return g;
    }
}

