"use strict";

/**
 * @namespace J3D holds all of the J3D classes except for the matrix and vector classes which reside in global namespace.
 */
var J3D = {};

J3D.VERSION = 1;
// Built on Tue Nov 13 18:06:53 2012
// Built on Tue Nov 13 18:10:46 2012
// Built on Wed Nov 14 17:06:38 2012
// Built on Wed Nov 14 17:48:03 2012
// Built on Wed Nov 14 18:05:37 2012
J3D.BUILD = 32;

J3D.getVersion = function() {
    return 'Version ' + J3D.VERSION + ' | Build ' + J3D.BUILD;
}

/**
 * @deprecated Not used in the code.
 */
J3D.debug = true;

J3D.LightmapAtlas = [];

/**
 * Maximum number of lights supported by built in shaders like Phong and Gouraud. Current value is 4.
 * @constant
 */
J3D.SHADER_MAX_LIGHTS = 4;

/**
 * Assigned to J3D.Geometry.renderMode to specify the object is opaque. Set automatically by the J3D.Geometry.prototype.setTransparency function.
 * @constant
 */
J3D.RENDER_AS_OPAQUE = 0;

/**
 * Assigned to J3D.Geometry.renderMode to specify the object is transparent. Set automatically by the J3D.Geometry.prototype.setTransparency function.
 * @constant
 */
J3D.RENDER_AS_TRANSPARENT = 1;