{
$meshes:{ 
	"$it.Id$": { 
		"name": "$it.Name$",
		"vertices": [$it.Vertices; separator=","$],	 
		"normals": [$it.Normals; separator=","$],
		"tangents": [$it.Tangents; separator=","$],
		"uv1": [$it.UV1; separator=","$],
		"uv2": [$it.UV2; separator=","$],
		"indices": [$it.Triangles; separator=","$]
	},
}$
}