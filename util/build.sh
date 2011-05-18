./buildShaders.py

java \
-jar build/compiler.jar \
--js_output_file ../build/j3dt.js \
--js ../src/J3D.js \
--js ../src/math/Vector3.js \
--js ../src/math/Matrix44.js \
--js ../src/engine/Engine.js \
--js ../src/engine/Scene.js \
--js ../src/engine/Loader.js \
--js ../src/engine/Mesh.js \
--js ../src/engine/Light.js \
--js ../src/engine/Camera.js \
--js ../src/engine/Texture.js \
--js ../src/engine/Cubemap.js \
--js ../src/engine/Transform.js \
--js ../src/engine/ShaderAtlas.js \
--js ../src/engine/Particles.js \
--js ../src/renderers/Shader.js \
--js ../src/renderers/Normal2Color.js \
--js ../src/renderers/Phong.js \
--js ../src/renderers/Gouraud.js \
--js ../src/renderers/Reflective.js \
--js ../src/renderers/Glass.js \
--js ../src/renderers/Skybox.js \
--js ../src/renderers/ShaderSource.js \
--js ../src/util/Color.js \
--js ../src/util/Time.js \
--js ../src/util/ParticleUtil.js \
--js ../lib/requestAnimationFrame.js \
--warning_level QUIET

cat ./build/info.txt ../lib/glMatrix.js ../build/j3dt.js > ../build/j3d.js

rm -Rf ../build/j3dt.js

