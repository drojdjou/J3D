J3D.Intersection = {};



J3D.Intersection.raySphere = function(r, t) {
    if (!t.collider || t.collider.type != J3D.SPHERE_COLLIDER)  {
        j3dlog("Warning! Attempt to test Ray/Sphere intersection against transform that has no collider or is not a sphere.")
        return false;
    }

    var radius = t.collider.radius;
    var radiusSq = radius * radius;

    r.makeLocal(t);

    var e = t.collider.center.sub( r.localOrigin );
	if ( e.lengthSq < radiusSq ) return false;

	var a = v3.dot( e, r.localDirection );
	if ( a <= 0 ) return false;

	var t = radiusSq - ( e.magSq() - a * a );
	if ( t >= 0 ) return Math.abs( a ) - Math.sqrt( t );

	return false;

};