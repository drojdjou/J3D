J3D.Reflective = function() {}
J3D.Reflective.prototype = new J3D.Shader("Reflective", J3D.ShaderSource.ReflectiveVertex, J3D.ShaderSource.ReflectiveFragment);
J3D.Reflective.prototype.constructor = J3D.Reflective;
J3D.Reflective.prototype.supr = J3D.Shader.prototype;