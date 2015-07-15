{
$meshes:{ 
	"$it.Id$": { 
		"name": "$it.Name$",
		"vertices": [$it.Vertices; separator=","$],	 
		$if(exportNormals)$
		"normals": [$it.Normals; separator=","$],$endif$
		$if(exportTangents)$
		"tangents": [$it.Tangents; separator=","$],$endif$
		$if(it.IsSkinned)$
		"boneWeights": [$it.BoneWeights; separator=","$],
		"boneIndices": [$it.BoneIndices; separator=","$],$endif$
		"uv1": [$it.UV1; separator=","$],
		$if(exportUV2)$
		"uv2": [$it.UV2; separator=","$],$endif$
		"indices": [$it.Triangles; separator=","$]
	},
}$
}