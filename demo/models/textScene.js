/*
 * File generated with unity3d-to-j3d exporter
 *
 * WARNING! Do not edit!
 */

J3DScene = {
	
ambient: { r:0.2, g:0.2, b:0.2, a:1 },
	
materials: {
	
	violet: { 
		type: J3D.Phong,
		color: { r:0.6074271, g:0, b:1, a:1 },
		specularIntensity: 31.54149
	},
	
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
		color: { r:0.7078295, g:1, b:0, a:1 },
		specularIntensity: 31.54149
	},
	
	orange: { 
		type: J3D.Phong,
		color: { r:1, g:0.4980392, b:0, a:1 },
		specularIntensity: 27.7588
	},
	
	grey: { 
		type: J3D.Gouraud,
		color: { r:0.5074627, g:0.5074627, b:0.5074627, a:1 },
		specularIntensity: 80.71642
	},
	
	blue: { 
		type: J3D.Phong,
		color: { r:0, g:0.4980392, b:1, a:1 },
		specularIntensity: 8.845374
	},

},

lights: {
	
	lamp: { 
		type: J3D.POINT,
		color: { r:0.5522388, g:0.3915126, b:0.3915126, a:1 },
	},
	
	sun: { 
		type: J3D.DIRECT,
		color: { r:0.4253731, g:0.4253731, b:0.4253731, a:1 },
		direction: [ 0.1770376,0.02858657,0.9837892 ],
	},

},

cameras: {
	
	camera: { 
		fov: 60,
		near: 0.3,
		far: 1000
	},

},

transforms: {
	
	camera: {
		position: [ -1.982018,1.132042,0.3971098 ],
		rotation: [ 0.4806843,-2.745592,-0.1909618 ],
		camera: "camera",
	},
	
	lamp: {
		position: [ 0,-0.6082401,-1.864061 ],
		rotation: [ 0,0,0 ],
		light: "lamp",
	},
	
	sun: {
		position: [ 0,0,0.01425409 ],
		rotation: [ -1.088399,-3.134262,0.2157209 ],
		light: "sun",
	},
	
	root: {
		position: [ 0,0,2 ],
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
		renderer: "light_green",
		mesh: "ring4"
	},
	
	ring5: {
		parent: "ring4",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "green",
		mesh: "ring5"
	},
	
	ring6: {
		parent: "ring5",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "blue",
		mesh: "ring6"
	},
	
	ring7: {
		parent: "ring6",
		position: [ 0,0,0 ],
		rotation: [ 0,0,0 ],
		renderer: "violet",
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




