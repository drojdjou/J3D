/**
    Creates a new Shader

    @class A Shader represents a piece of GLSL code composed of a vertex shader and a fragment shader. The uniform properties present in the GLSl shader code are reflected as public properties of the instance of J3D.Shader

    @param n The mandatory name of the shader.

    @param v The mandatory source of the vertex shader.

    @param f The mandatory source of the fragment shader.

    @param m The shaders metadata. This optional argument, which is  an object literal, allows to provide information such as shaders author and/or description.
 */
J3D.Shader = function(n, v, f, m) {
	if(!n) throw new Error("You must specify a name for custom shaders");
	if(v == null || f == null) throw new Error("You must pass a vertex and fragment shader source for custom shaders");
	
	this.name = n;
	this.drawMode = 0x0004;// <- gl.TRIANGLES, but since it can be called before J3D.Engine and gl are initialized, let's use the value directly
	
	this._vertSource = v;
	this._fragSource = f;
	
	this.reloadStaticUniforms = true;
	this.su = {};
	this.loadedStaticTextures = {};
	
	this.metaData = m || {};

    this.cloneCount = 0;
}

J3D.Shader.prototype.vertSource = function() {
	return this._vertSource;
}

J3D.Shader.prototype.fragSource = function() {
	return this._fragSource;
}

J3D.Shader.prototype.setup = function(shader, transform) {
	if(this.reloadStaticUniforms) {
		this.loadedStaticTextures = {};
	}

    this.uTime = J3D.Time.time;

	var t = 0;
	for(var s in shader.uniforms) {	
		if (this.reloadStaticUniforms && this.su[s] != null && this[s] == null && this.su[s].loaded == null) {
			J3D.ShaderUtil.setUniform(s, shader, this.su);
		}
		
		if(this.su[s] != null && this[s] == null && this.su[s].loaded && !this.loadedStaticTextures[s]) {
			J3D.ShaderUtil.setUniform(s, shader, this.su);
			this.loadedStaticTextures[s] = true;
		}
		
		if (this[s] != null) {
			t++;
            J3D.ShaderUtil.setUniform(s, shader, this);
		}
	}
	this.reloadStaticUniforms = false;
}

J3D.Shader.prototype.clone = function() {
    this.cloneCount++;
    var n = this.name;// + "_" + this.cloneCount;

	var c = new J3D.Shader(n, this._vertSource, this._fragSource);
	
	for(s in this) {
		if (typeof this[s] !== "function" && this.hasOwnProperty(s) && s != "name") {
			c[s] = this[s];
		}
	}
	
	if (this.hasOwnProperty("setup")) {
		c.setup = this.setup;
	}
	
	c.su = {};
	
	for(ss in this.su) {
		if (typeof this.su[ss] !== "function" && this.su.hasOwnProperty(ss)) {
			c.su[ss] = this.su[ss];
		}
	}
	
	c.reloadStaticUniforms = true;

	return c;
}