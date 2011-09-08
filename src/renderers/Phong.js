J3D.Phong = function(){
	J3D.Shader.call( this, "Phong", J3D.ShaderSource.PhongVertex, J3D.ShaderSource.PhongFragment );
    this.uColor = J3D.Color.white;
    this.uSpecularIntensity = 0;
    this.uShininess = 0;
    this.uColorSampler = null;
    
    this.logd = false;
}

J3D.Phong.prototype = new J3D.Shader("Phong", J3D.ShaderSource.PhongVertex, J3D.ShaderSource.PhongFragment);
J3D.Phong.prototype.constructor = J3D.Phong;
J3D.Phong.prototype.supr = J3D.Shader.prototype;

J3D.Phong.prototype.setup = function(shader){
    this.uHasColorSampler = (this.uColorSampler != null);
    
    for (var s in shader.uniforms) {
		if (this[s] != null) {
            J3D.ShaderUtil.setUniform(s, shader, this);
            
            if (!this.logd) {
                console.log(s)
            }
        }
    }
	
	 if (!this.logd) {
                console.log("-----: " + this.uColorSampler + " - " + this.uHasColorSampler);
            }
	
	this.logd = true;
}
