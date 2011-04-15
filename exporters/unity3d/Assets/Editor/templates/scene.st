/*
 * File generated with unity3d-to-j3d exporter
 *
 * WARNING! Do not edit!
 */

$prefix$ = {
	
ambient: { r:$ambient.r$, g:$ambient.g$, b:$ambient.b$, a:$ambient.a$ },
	
materials: {
$materials:{	
	$it.Name$: { 
		type: $it.Type$,
		color: { r:$it.Color.r$, g:$it.Color.g$, b:$it.Color.b$, a:$it.Color.a$ },
		specularIntensity: $it.SpecularIntensity$
	},
}$
},

lights: {
$lights:{	
	$it.Name$: { 
		type: $it.Type$,
		color: { r:$it.Color.r$, g:$it.Color.g$, b:$it.Color.b$, a:$it.Color.a$ },
		$if(it.IsDirectional)$
		direction: [ $it.Direction; separator=","$ ],$endif$
	},
}$
},

cameras: {
$cameras:{	
	$it.Name$: { 
		fov: $it.FOV$,
		near: $it.Near$,
		far: $it.Far$
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
		$if(it.HasLight)$
		light: "$it.LightName$",$endif$
		$if(it.HasCamera)$
		camera: "$it.CameraName$",$endif$
		$if(it.HasRenderer)$
		renderer: "$it.MaterialName$",
		mesh: "$it.MeshName$"$endif$
	},
}$
}
}




