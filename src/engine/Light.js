/**
    Creates a new Light

    @class A Light represents a sinlge light source. It must be attached to a transform to be used in the scene. The class has several properties. In general the build-in shaders will take those parameters into account when rendering the lights. If you create your own shaders, you are free to use and interpret those parameters any way you want. Take a look in Lights.glsl at the 'struct lightSource' which is a mapping of that class in GLSL.

    @param t Type. Use one of the constants defined in this class.
 */
J3D.Light = function(t){

    /**
     * @property {number} One of the following types: {@link J3D.AMBIENT}, {@link J3D.DIRECT}, {@link J3D.POINT}, {@link J3D.SPOLIGHT}, {@link J3D.HEMISPHERE} or {@link J3D.SPHERICAL_HARMONICS}.
     */
	this.type = (t != null) ? t : J3D.NONE;

    /**
     * @property The color of the light. Can be of type J3D.Color or just an Array like: [r,g,b] or [r,g,b,a]. All color values should be normalized.
     */
	this.color = J3D.Color.white;

    /**
     * @property {number} The intensity of the light. Default value is 1.
     */
	this.intensity = 1.0;

    /**
     * @property {number} The angle falloff used by the spotlight.
     */
    this.angleFalloff = 0.0;

    /**
     * @property {number} The angle of the spotlight.
     */
    this.angle = 0.0;

    // this.attenuation = 1.0 // TODO: implement attenuation
}

/**
 * Type of light: None. This is used of shader internals.
 * @constant
 */
J3D.NONE = -1;

/**
 * Type of light: Ambient. Only other setting used by ambient color.
 * @constant
 */
J3D.AMBIENT = 0;

/**
 * Type of light: Directional. To determine its direction the transforms rotation is used. Other settings used by ths light are: color and intensity.
 * @constant
 */
J3D.DIRECT = 1;

/**
 * Type of light: Point light. To determine its position the transforms position is used. Other settings used by ths light are: color and intensity.
 * @constant
 */
J3D.POINT = 2;

/**
 * Type of light: Spotlight. To determine its position and direction the transforms position and rotation is used. Other settings used by ths light are: angle, angleFalloff, color and intensity.
 * @constant
 */
J3D.SPOTLIGHT = 3;

/**
 * Type of light: Hemisphere light. Hemisphere light is similar to POint light, but the light calculation algorithm is slightly different. All the same parameters are used though.
 * @constant
 */
J3D.HEMISPHERE = 4;

/**
 * Type of light: Spherical Harmonics. This light type does not have any settings. The coefficients are hardcoded into the shaders currently - (take a look at Lights.glsl) but there are plans to allow conditional compilation in shaders in the future. The one that is currently used is 'Grace Catherdral'.
 * @constant
 */
J3D.SPHERICAL_HARMONICS = 5;


