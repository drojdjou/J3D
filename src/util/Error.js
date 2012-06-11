/**
  @class Defines some error messages thrown by the engine.
 */
J3D.Error = {};

/**
 * Thrown when there is no WebGL context in the browser.
 * @constant
 */
J3D.Error.NO_WEBGL_CONTEXT = "No webgl context. Looks like your browser does not support webgl :(";

/**
 * Thrown when engine.render() is called but no camera was defined.
 * @constant
 */
J3D.Error.NO_CAMERA = "Missing camera. Please assign a transform with a camera attached to engine.camera";

/**
 * Thrown when a non-existing shader is requested from J3D.BuiltinShaders.fetch
 * @constant
 */
J3D.Error.NO_BUILTIN_SHADER = "Built-in shader not found: ";

/**
 * Thrown when there is no WebGL context in the browser.
 * @constant
 */
J3D.Error.UNKNOWN_COLLIDER_TYPE = "Unrecognized collider type: ";

/**
 * Thrown when there is no WebGL context in the browser.
 * @constant
 */
J3D.Error.SHADER_COMPILE_ERROR = "Shader compile error: ";
