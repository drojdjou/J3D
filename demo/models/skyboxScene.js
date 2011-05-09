{
	
"ambient": { "r":0.2, "g":0.2, "b":0.2, "a":1 },
	
"materials": {
	
	"skybox_no_name": { 
		"type": "Phong",
		"color": { "r":1, "g":1, "b":1, "a":1 },
		"specularIntensity": 0
	}

},

"lights": {
},

"cameras": {
},

"transforms": {
	
	"skybox": {
		"position": [ 0,0,0 ],
		"rotation": [ 0,0,0 ],
		"renderer": "skybox_no_name",
		"mesh": "skybox"
	}

}
}




