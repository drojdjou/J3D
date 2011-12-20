echo "[Building shaders]"
./buildShaders.py

echo "[Compiling JS source files]"
java \
-jar build/compiler.jar \
--js_output_file ../build/j3dt.js \
--js ../src/util/Logger.js \
--js ../src/J3D.js \
--js ../src/math/Vector3.js \
--js ../src/math/Vector2.js \
--js ../src/math/Matrix44.js \
--js ../src/engine/Engine.js \
--js ../src/engine/Scene.js \
--js ../src/engine/Loader.js \
--js ../src/engine/Geometry.js \
--js ../src/engine/Mesh.js \
--js ../src/engine/Light.js \
--js ../src/engine/Camera.js \
--js ../src/engine/Texture.js \
--js ../src/engine/Cubemap.js \
--js ../src/engine/Transform.js \
--js ../src/engine/ShaderAtlas.js \
--js ../src/engine/Particles.js \
--js ../src/engine/Postprocess.js \
--js ../src/engine/FrameBuffer.js \
--js ../src/engine/Primitives.js \
--js ../src/engine/Shader.js \
--js ../src/engine/ShaderSource.js \
--js ../src/engine/Ray.js \
--js ../src/engine/Collider.js \
--js ../src/util/Color.js \
--js ../src/util/Time.js \
--js ../src/util/ParticleUtil.js \
--js ../src/util/ShaderUtil.js \
--js ../src/util/Intersection.js \
--js ../src/engine/BuiltinShaders.js \
--js ../lib/requestAnimationFrame.js \
--warning_level QUIET

echo "[Adding external libraries]"
cat ./build/info.txt ../lib/glMatrix.js ../build/j3dt.js > ../build/j3d.js

echo "[Clean up]"
rm -Rf ../build/j3dt.js

echo "[Done!]"
