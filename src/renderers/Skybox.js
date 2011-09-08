J3D.Skybox = function() { this.c = 1; }

J3D.Skybox.prototype = new J3D.Shader("Skybox", J3D.ShaderSource.SkyboxVertex, J3D.ShaderSource.SkyboxFragment);
J3D.Skybox.prototype.constructor = J3D.Skybox;
J3D.Skybox.prototype.supr = J3D.Shader.prototype;