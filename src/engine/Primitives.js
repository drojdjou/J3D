J3D.Primitive = {};

J3D.Primitive.Cube = function(w, h, d) {
	var c = J3D.Primitive.getEmptyGeometry();
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

J3D.Primitive.getEmptyGeometry = function(){
	var g = {};
	g.vertices = [];	 
	g.normals = [];
	g.colors = [];
	g.uv1 = [];
	g.uv2 = [];
	g.tris = [];
	return g;
}

J3D.Primitive.addQuad = function(g, p1, p2, p3, p4) {
	var n1 = v3.cross(p1.sub(p2), p2.sub(p3)).norm();
	var p = g.vertices.length / 3;
	g.vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
	g.normals.push (n1.x, n1.y, n1.z, n1.x, n1.y, n1.z, n1.x, n1.y, n1.z, n1.x, n1.y, n1.z);
	g.uv1.push(0,0, 0,1, 1,1, 1,0);
	g.tris.push(p, p + 1, p + 2, p, p + 2, p + 3);
}
