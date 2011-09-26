{
	
"path" : "",
"ambient": { "r":0, "g":0, "b":0, "a":1 },
"background": { "r":0, "g":0, "b":0, "a":1 },

"textures": {
	
	"map_col": { 
		"file": "map_col.png"
	}

},
	
"materials": {
	
	"leeperry_defaultmat": { 
		"type": "Phong",
		"color": { "r":0.8, "g":0.8, "b":0.8, "a":1 },
		"specularIntensity": 0,
		"textureTile": [ 1,1 ],
		"textureOffset": [ 0,0 ],
		"colorTexture": "map_col"
	}

},

"lights": {
	
	"sun": { 
		"type": 1,
		"color": { "r":1, "g":1, "b":1, "a":1 },
		"direction": [ 0.612766,0,-0.7902644 ]
	}

},

"cameras": {
	
	"camera": { 
		"fov": 60,
		"near": 0.3,
		"far": 1000
	}

},

"transforms": [
	
	{
		"uid": 0,
                "name": "sun",
		"position": [ -2,0,3 ],
		"rotation": [ 0,-0.6595559,0 ],
		"light": "sun"
	},
	
	{
		"uid": 1,
                "name": "headbase",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ]
	},
	
	{
		"uid": 2,
                "name": "head",
		"parent": 1,
		"position": [ -0.004249275,-0.06889248,-0.2370338 ],
		"rotation": [ 0,0,0 ],
		"renderer": "leeperry_defaultmat",
		"mesh": "head"
	},
	
	{
		"uid": 3,
                "name": "base",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ]
	},
	
	{
		"uid": 4,
                "name": "camera",
		"parent": 3,
		"position": [ 0,0,3 ],
		"rotation": [ 0,0,0 ],
		"camera": "camera"
	}

]
}




