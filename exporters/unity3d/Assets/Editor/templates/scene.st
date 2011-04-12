/*
 * File generated with unity3d-to-j3d exporter
 *
 * WARNING! Do not edit!
 */

$prefix$ = {
	
materials: {
$materials:{	
	$it.Name$: { 
		type: $it.Type$,
		color: { r:$it.Color.r$, g:$it.Color.g$, b:$it.Color.b$, a:$it.Color.a$ },
		specularIntensity: $it.SpecularIntensity$
	},
}$
},

transforms: {
$transforms:{	
	$it.Name$: {
		$if(it.HasParent)$
		parent: "$it.Parent$",$endif$
		position: [ $it.Position; separator=","$ ],
		rotation: [ $it.Rotation; separator=","$ ],
		$if(it.HasRenderer)$
		renderer: "$it.MaterialName$",
		mesh: "$it.MeshName$"$endif$
	},
}$
}
}




