{
	
"path" : "",
"ambient": { "r":$ambient.r$, "g":$ambient.g$, "b":$ambient.b$, "a":$ambient.a$ },
"background": { "r":$background.r$, "g":$background.g$, "b":$background.b$, "a":$background.a$ },

"textures": {
$textures:{	
	"$it.Name$": { 
		"file": "$it.FileName$"
	},
}$
},

"lightmaps": [
$lightmaps:{
	"$it.FileName$",
}$
],
	
"materials": {
$materials:{	
	"$it.Name$": { 
		"type": "$it.Type$",
		"color": { "r":$it.Color.r$, "g":$it.Color.g$, "b":$it.Color.b$, "a":$it.Color.a$ },
		"specularIntensity": $it.SpecularIntensity$,
        "shininess": $it.Shininess$,
		"textureTile": [ $it.TextureScale; separator=","$ ],
		"textureOffset": [ $it.TextureOffset; separator=","$ ],
		$if(it.HasEmissiveColor)$
		"emissive": { "r":$it.EmissiveColor.r$, "g":$it.EmissiveColor.g$, "b":$it.EmissiveColor.b$, "a":$it.EmissiveColor.a$ },$endif$
		$it.Textures; separator=",\n"$
	},
}$
},

"lights": {
$lights:{	
	"$it.Name$": { 
		"type": $it.Type$,
		"color": { "r":$it.Color.r$, "g":$it.Color.g$, "b":$it.Color.b$, "a":$it.Color.a$ },
		"intensity": $it.Intensity$,
		$if(it.IsSpot)$
		"angle": $it.Angle$,
		"angleFalloff": $it.FalloffAngle$,$endif$
	},
}$
},

"cameras": {
$cameras:{	
	"$it.Name$": { 
		"fov": $it.FOV$,
		"near": $it.Near$,
		"far": $it.Far$
	},
}$
},

"transforms": [
$transforms:{	
	{
		"uid": $it.UID$,
        "name": "$it.name$",
		$if(it.HasParent)$
		"parent": $it.Parent$,$endif$
		"position": [ $it.Position; separator=","$ ],
		"rotation": [ $it.Rotation; separator=","$ ],
		$if(it.HasScale)$
		"scale": [ $it.Scale; separator=","$ ],$endif$
		$if(it.HasCollider)$
		"collider": {
		    "type": "$it.Collider.Type$",
		    $if(it.Collider.HasCenter)$
		    "center": [ $it.Collider.Center; separator=","$ ],$endif$
		    $if(it.Collider.HasSize)$
		    "size": [ $it.Collider.Size; separator=","$ ],$endif$
		    $if(it.Collider.HasRadius)$
		    "radius": $it.Collider.Radius$,$endif$
		    $if(it.Collider.HasMesh)$
		    "mesh": "$it.Collider.MeshName$",$endif$
		},$endif$
		$if(it.HasLight)$
		"light": "$it.LightName$",$endif$
		$if(it.HasCamera)$
		"camera": "$it.CameraName$",$endif$
		$if(it.HasRenderer)$
		"renderer": "$it.MaterialName$",
		"mesh": "$it.MeshName$",$endif$
		$if(it.HasLightmap)$
		"lightmapIndex": $it.LightmapIndex$,
		"lightmapTileOffset": [ $it.LightmapTileOffset; separator=","$ ],$endif$
	},
}$
]
}




