J3D.Intersection = {};


J3D.Intersection.raySphere = function(r, t) {
    if (!t.collider || t.collider.type != J3D.SPHERE_COLLIDER) {
        j3dlog("Warning! Attempt to test Ray/Sphere intersection against transform that has no collider or it's not a sphere.")
        return false;
    }

    var radius = t.collider.radius;
    var radiusSq = radius * radius;

    r.makeLocal(t);

    var e = t.collider.center.sub(r.localOrigin);
    if (e.lengthSq < radiusSq) return false;

    var a = v3.dot(e, r.localDirection);
    if (a <= 0) return false;

    var t = radiusSq - ( e.magSq() - a * a );
    if (t >= 0) return Math.abs(a) - Math.sqrt(t);

    return false;

};

J3D.Intersection.rayBox = function(r, t) {
    if (!t.collider || t.collider.type != J3D.BOX_COLLIDER) {
        j3dlog("Warning! Attempt to test Ray/Box intersection against transform that has no collider or it's not a box.")
        return false;
    }

    var b = t.collider.box;

    r.makeLocal(t);

    var xt = 0, yt = 0, zt = 0;
    var xn = 0, yn = 0, zn = 0;
    var ins = true;

    if (r.localOrigin.x < b.minX) {

        xt = b.minX - r.localOrigin.x;
        //if(xt > r.localDirection.x) return return Number.MAX_VALUE;
        xt /= r.localDirection.x;
        ins = false;
        xn = -1;

    } else if (r.localOrigin.x > b.maxX) {

        xt = b.maxX - r.localOrigin.x;
        //if(xt < r.localDirection.x) return return Number.MAX_VALUE;
        xt /= r.localDirection.x;
        ins = false;
        xn = 1;

    }

    if (r.localOrigin.y < b.minY) {

        yt = b.minY - r.localOrigin.y;
        //if(yt > r.localDirection.y) return return Number.MAX_VALUE;
        yt /= r.localDirection.y;
        ins = false;
        yn = -1;

    } else if (r.localOrigin.y > b.maxY) {

        yt = b.maxY - r.localOrigin.y;
        //if(yt < r.localDirection.y) return return Number.MAX_VALUE;
        yt /= r.localDirection.y;
        ins = false;
        yn = 1;

    }

    if (r.localOrigin.z < b.minZ) {

        zt = b.minZ - r.localOrigin.z;
        //if(zt > r.direction.z) return return Number.MAX_VALUE;
        zt /= r.localDirection.z;
        ins = false;
        zn = -1;

    } else if (r.localOrigin.z > b.maxZ) {

        zt = b.maxZ - r.localOrigin.z;
        //if(zt < r.direction.z) return return Number.MAX_VALUE;
        zt /= r.localDirection.z;
        ins = false;
        zn = 1;

    }

    if (ins) return false;

    var which = 0;
    var td = xt;

    if (yt > td) {

        which = 1;
        td = yt;

    }

    if (zt > td) {

        which = 2;
        td = zt;

    }

    switch (which) {

        case 0:

            var y = r.localOrigin.y + r.localDirection.y * td;
            if (y < b.minY || y > b.maxY) return false;
            var z = r.localOrigin.z + r.localDirection.z * td;
            if (z < b.minZ || z > b.maxZ) return false;
            //ab.normal = new THREE.Vector3(xn, 0, 0);
            break;

        case 1:

            var x = r.localOrigin.x + r.localDirection.x * td;
            if (x < b.minX || x > b.maxX) return false;
            var z = r.localOrigin.z + r.localDirection.z * td;
            if (z < b.minZ || z > b.maxZ) return false;
            //ab.normal = new THREE.Vector3(0, yn, 0);
            break;

        case 2:

            var x = r.localOrigin.x + r.localDirection.x * td;
            if (x < b.minX || x > b.maxX) return false;
            var y = r.localOrigin.y + r.localDirection.y * td;
            if (y < b.minY || y > b.maxY) return false;
            //ab.normal = new THREE.Vector3(0, 0, zn);
            break;

    }

    return td;
}