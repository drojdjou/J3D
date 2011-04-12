/*
 * File generated with unity3d-to-j3d exporter
 *
 * WARNING! Do not edit!
 */

J3DScene = {
	
materials: {
	
	yellow: { 
		type: J3D.Phong,
		color: { r:1, g:1, b:0, a:1 },
		specularIntensity: 29.65015
	},
	
	red: { 
		type: J3D.Phong,
		color: { r:1, g:0, b:0, a:1 },
		specularIntensity: 31.54149
	},
	
	green: { 
		type: J3D.Phong,
		color: { r:0, g:1, b:0, a:1 },
		specularIntensity: 76.93373
	},
	
	light_green: { 
		type: J3D.Phong,
		color: { r:0.4980392, g:1, b:0, a:1 },
		specularIntensity: 31.54149
	},
	
	orange: { 
		type: J3D.Phong,
		color: { r:1, g:0.4980392, b:0, a:1 },
		specularIntensity: 27.7588
	},
	
	grey: { 
		type: J3D.Phong,
		color: { r:0.5074627, g:0.5074627, b:0.5074627, a:1 },
		specularIntensity: 31.54149
	},
	
	blue: { 
		type: J3D.Phong,
		color: { r:0, g:0.4980392, b:1, a:1 },
		specularIntensity: 31.54149
	},

},

transforms: {
	
	root: {
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
	},
	
	ring1: {
		parent: "root",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "red",
		mesh: "ring1"
	},
	
	ring2: {
		parent: "ring1",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "orange",
		mesh: "ring2"
	},
	
	ring3: {
		parent: "ring2",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "yellow",
		mesh: "ring3"
	},
	
	ring4: {
		parent: "ring3",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "yellow",
		mesh: "ring4"
	},
	
	ring5: {
		parent: "ring4",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "light_green",
		mesh: "ring5"
	},
	
	ring6: {
		parent: "ring5",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "green",
		mesh: "ring6"
	},
	
	ring7: {
		parent: "ring6",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "blue",
		mesh: "ring7"
	},
	
	text: {
		parent: "root",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "grey",
		mesh: "text"
	},

}
}




