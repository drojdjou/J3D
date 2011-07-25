J3D.Primitive = {};

J3D.Primitive.Cube = function(w, h, d) {
	var c = J3D.Primitive.getEmpty();
	w = w * 0.5;
	h = h * 0.5;
	d = d * 0.5;
	
	J3D.Primitive.addQuad(c, new v3(-w, h, d), new v3(w, h, d), new v3(w, -h, d), new v3(-w, -h, d));
	J3D.Primitive.addQuad(c, new v3(w, h, -d), new v3(-w, h, -d), new v3(-w, -h, -d), new v3(w, -h, -d));
	
	J3D.Primitive.addQuad(c, new v3(-w, h, -d), new v3(-w, h, d), new v3(-w, -h, d), new v3(-w, -h, -d));
	J3D.Primitive.addQuad(c, new v3(w, h, d), new v3(w, h, -d), new v3(w, -h, -d), new v3(w, -h, d));
	
	J3D.Primitive.addQuad(c, new v3(w, h, d), new v3(-w, h, d), new v3(-w, h, -d), new v3(w, h, -d));
	J3D.Primitive.addQuad(c, new v3(w, -h, d), new v3(w, -h, -d), new v3(-w, -h, -d), new v3(-w, -h, d));

	return new J3D.Mesh(c);
}

J3D.Primitive.Plane = function(w, h, wd, hd) {
	var c = J3D.Primitive.getEmpty();
	w = w * 0.5;
	h = h * 0.5;
	
	if(!wd) wd = 1;
	if(!hd) hd = 1;
	
	var wStart = -w;
	var wEnd = w;
	var hStart = h;
	var hEnd = -h;
	var uStart = 0;
	var uEnd = 1;
	var vStart = 1;
	var vEnd = 0;
	
	var wb = (w * 2) / wd;
	var hb = (h * 2) / hd;
	
	for(var i = 0; i < wd; i++) {
		for(var j = 0; j < hd; j++) {
			
			var bvStart = wStart + i * wb;
			var bvEnd = bvStart + wb;
			var bhStart = hStart - j * hb;
			var bhEnd = bhStart - hb;
			
			var va = new v3(bvStart, bhStart, 0);
			var vb = new v3(bvEnd, bhStart, 0);
			var vc = new v3(bvEnd, bhEnd, 0);
			var vd = new v3(bvStart, bhEnd, 0);
			
			var us = 1 / wd * i;
			var ue = 1 / wd * (i + 1);
			var vs = 1 - (1 / hd * (j + 1));
			var ve = 1 - (1 / hd * j);
			
			J3D.Primitive.addQuad(c, va, vb, vc, vd, us, ue, vs, ve);
		}
	}

	return new J3D.Mesh(c);
}

J3D.Primitive.getEmpty = function(){
	var g = {};
	g.vertices = [];	 
	g.normals = [];
	g.uv1 = [];
	g.tris = [];
	return g;
}

J3D.Primitive.addQuad = function(g, p1, p2, p3, p4, minU, maxU, minV, maxV) {
	var n1 = v3.cross(p1.sub(p2), p2.sub(p3)).norm();
	var p = g.vertices.length / 3;
	
	var nu = (minU) ? minU : 0;
	var xu = (maxU) ? maxU : 1;
	var nv = (minV) ? minV : 0;
	var xv = (maxV) ? maxV : 1;
	
		
	g.vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
	g.normals.push (n1.x, n1.y, n1.z, n1.x, n1.y, n1.z, n1.x, n1.y, n1.z, n1.x, n1.y, n1.z);
	g.uv1.push(nu,xv, xu,xv, xu,nv, nu,nv);
	
	g.tris.push(p, p + 1, p + 2, p, p + 2, p + 3);
}
