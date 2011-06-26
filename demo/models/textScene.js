{
	
"path" : "",
"ambient": { "r":0, "g":0, "b":0, "a":1 },
"background": { "r":0, "g":0, "b":0, "a":1 },

"textures": {
},
	
"materials": {
	
	"violet": { 
		"type": "Phong",
		"color": { "r":0.6074271, "g":0, "b":1, "a":1 },
		"specularIntensity": 31.54149,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"yellow": { 
		"type": "Phong",
		"color": { "r":1, "g":1, "b":0, "a":1 },
		"specularIntensity": 29.65015,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"grey": { 
		"type": "Gouraud",
		"color": { "r":0.5074627, "g":0.5074627, "b":0.5074627, "a":1 },
		"specularIntensity": 80.71642,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"green": { 
		"type": "Phong",
		"color": { "r":0, "g":1, "b":0, "a":1 },
		"specularIntensity": 76.93373,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"light_green": { 
		"type": "Phong",
		"color": { "r":0.7078295, "g":1, "b":0, "a":1 },
		"specularIntensity": 31.54149,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"orange": { 
		"type": "Phong",
		"color": { "r":1, "g":0.4980392, "b":0, "a":1 },
		"specularIntensity": 27.7588,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"redlight": { 
		"type": "Phong",
		"color": { "r":1, "g":0, "b":0, "a":1 },
		"specularIntensity": 0,
		"textureTile": [  ],
		"textureOffset": [  ]
	},
	
	"blue": { 
		"type": "Phong",
		"color": { "r":0, "g":0.4980392, "b":1, "a":1 },
		"specularIntensity": 8.845374,
		"textureTile": [  ],
		"textureOffset": [  ]
	}

},

"lights": {
	
	"sun": { 
		"type": 1,
		"color": { "r":1, "g":1, "b":1, "a":1 },
		"direction": [ -0.1517519,0.7256743,0.6710949 ]
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
		"name": "camera",
		"position": [ 0,0,-0.5 ],
		"rotation": [ 0,3.141592,0 ],
		"camera": "camera"
	},
	
	{
		"name": "sun",
		"position": [ 0,0,0.01425409 ],
		"rotation": [ -0.8351003,-3.136525,0.2129833 ],
		"light": "sun"
	},
	
	{
		"name": "root",
		"position": [ 0,0,2 ],
		"rotation": [ 0,0,0 ]
	},
	
	{
		"name": "ring1",
		"parent": "root",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "redlight",
		"mesh": "ring1"
	},
	
	{
		"name": "ring2",
		"parent": "ring1",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "orange",
		"mesh": "ring2"
	},
	
	{
		"name": "ring3",
		"parent": "ring2",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "yellow",
		"mesh": "ring3"
	},
	
	{
		"name": "ring4",
		"parent": "ring3",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "light_green",
		"mesh": "ring4"
	},
	
	{
		"name": "ring5",
		"parent": "ring4",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "green",
		"mesh": "ring5"
	},
	
	{
		"name": "ring6",
		"parent": "ring5",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "blue",
		"mesh": "ring6"
	},
	
	{
		"name": "ring7",
		"parent": "ring6",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "violet",
		"mesh": "ring7"
	},
	
	{
		"name": "text",
		"parent": "root",
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "grey",
		"mesh": "text"
	}

]
}




