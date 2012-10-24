J3D.MathUtil = {

    getBoundsAtDistance:  function(camera, distance) {

        var aspect = gl.viewportWidth / gl.viewportHeight;
        var t = Math.tan(camera.fov / 180 * Math.PI / 2);
        var h = distance * t;
        var w = h * aspect;
        return { w : w, h : h };

    },

    // Code based on http://www.terathon.com/code/tangent.html
    calculateTangents: function(c) {

        c.tangents = [];

        var tan1 = [];
        var tan2 = [];

        var x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r, sdir, tdir;

        for (var i = 0; i < c.tris.length; i += 3) {

            var i1 = c.tris[i + 0];
            var i2 = c.tris[i + 1];
            var i3 = c.tris[i + 2];

            var _v1 = new v3(c.vertices[i1*3 + 0], c.vertices[i1*3 + 1], c.vertices[i1*3 + 2]);
            var _v2 = new v3(c.vertices[i2*3 + 0], c.vertices[i2*3 + 1], c.vertices[i2*3 + 2]);
            var _v3 = new v3(c.vertices[i3*3 + 0], c.vertices[i3*3 + 1], c.vertices[i3*3 + 2]);

            var w1 = new v2(c.uv1[i1*2 + 0], c.uv1[i1*2 + 1]);
            var w2 = new v2(c.uv1[i2*2 + 0], c.uv1[i2*2 + 1]);
            var w3 = new v2(c.uv1[i3*2 + 0], c.uv1[i3*2 + 1]);

            x1 = _v2.x - _v1.x;
            y1 = _v2.y - _v1.y;
            z1 = _v2.z - _v1.z;

            x2 = _v3.x - _v1.x;
            y2 = _v3.y - _v1.y;
            z2 = _v3.z - _v1.z;

            s1 = w2.x - w1.x;
            t1 = w2.y - w1.y;

            s2 = w3.x - w1.x;
            t2 = w3.y - w1.y;

            r = 1.0 / (s1 * t2 - s2 * t1);

            sdir = new v3((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
            tdir = new v3((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

            if (!tan1[i1]) tan1[i1] = new v3();
            if (!tan1[i2]) tan1[i2] = new v3();
            if (!tan1[i3]) tan1[i3] = new v3();

            if (!tan2[i1]) tan2[i1] = new v3();
            if (!tan2[i2]) tan2[i2] = new v3();
            if (!tan2[i3]) tan2[i3] = new v3();

            tan1[i1] = tan1[i1].add(sdir);
            tan1[i2] = tan1[i2].add(sdir);
            tan1[i3] = tan1[i3].add(sdir);

            tan2[i1] = tan2[i1].add(tdir);
            tan2[i2] = tan2[i2].add(tdir);
            tan2[i3] = tan2[i3].add(tdir);
        }

        var t, n, w, tangent;

        for (var i = 0; i < c.vertices.length; i += 3) {
            var d = Math.floor(i / 3);
            n = new v3(c.normals[i + 0], c.normals[i + 1], c.normals[i + 2]);
            t = tan1[d];

            // Gram-Schmidt orthogonalize
            tangent = v3.sub(t, n.mul(v3.dot(n, t))).norm();

            // Calculate handedness
            w = (v3.dot(v3.cross(n, t), tan2[d]) < 0) ? -1 : 1;

            c.tangents.push(tangent.x, tangent.y, tangent.z, w);
        }

    }

}

