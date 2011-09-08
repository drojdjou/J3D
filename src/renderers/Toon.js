J3D.Toon = function() {}
J3D.Toon.prototype = new J3D.Shader("Toon", J3D.ShaderSource.ToonVertex, J3D.ShaderSource.ToonFragment);
J3D.Toon.prototype.constructor = J3D.Toon;
J3D.Toon.prototype.supr = J3D.Shader.prototype;