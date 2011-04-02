normal2ColorShaderName = "Normal2Color"

J3D.Normal2Color = function() {
	this.shaderName = normal2ColorShaderName;
}

J3D.Normal2Color.prototype.setupLocations = function(shader) {
	shader.vertAttr = gl.getAttribLocation(shader, "aVertexPosition");
	gl.enableVertexAttribArray(shader.vertAttr);
	
	shader.normAttr = gl.getAttribLocation(shader, "aVertexNormal");
	gl.enableVertexAttribArray(shader.normAttr);

	shader.projMat = gl.getUniformLocation(shader, "projMat");
	shader.mvMat = gl.getUniformLocation(shader, "uMVMatrix");
	shader.nMat = gl.getUniformLocation(shader, "uNMatrix");
}

J3D.Normal2Color.prototype.setup = function(mesh, shader, lights, ambient){	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertBuf);
	gl.vertexAttribPointer(shader.vertAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normBuf);
	gl.vertexAttribPointer(shader.normAttr, mesh.vertSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.triBuf);
}

// ############## Shader source

J3D.ShaderSource[normal2ColorShaderName] = {

name: normal2ColorShaderName,

vert: [
    "attribute vec3 aVertexPosition;",
    "attribute vec3 aVertexNormal;",
 
    "uniform mat4 uMVMatrix;",
    "uniform mat4 projMat;",
    "uniform mat3 uNMatrix;",
	
	"varying vec3 vColor;",

    "void main(void) {",
	"    gl_Position = projMat *  uMVMatrix * vec4(aVertexPosition, 1.0);",
    "    vColor = normalize( uNMatrix * aVertexNormal );",	
    "}"
].join("\n"),

frag: [
    "#ifdef GL_ES",
    "precision highp float;",
    "#endif",
 
    "varying vec3 vColor;",

    "void main(void) {",
	"   gl_FragColor =  vec4(vColor, 1.0);",
    "}"

].join("\n")

};