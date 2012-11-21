/**
 * Creates a new Color
 *
 * @class Color is used to hold information about colors that can be passed as uniforms to a shader. The color has red, green, blue and alpha channels defined in normalized values.
 */
J3D.Color = function(r, g, b, a) {

    if(J3D.Performance) J3D.Performance.numColors++;

    var that = this;
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 0;

    this.multiplyRGB = function(v) {
        this.r *= v;
        this.g *= v;
        this.b *= v;
        return this;
    }

    this.rgba = function() {
        J3D.Performance.numColorArrays++;
        return [that.r, that.g, that.b, that.a];
    }

    this.rgb = function() {
        J3D.Performance.numColorArrays++;
        return [that.r, that.g, that.b];
    }

    this.toUniform = function(type) {
        if (type == gl.FLOAT_VEC3) return this.rgb();
        else return this.rgba();
    }

    this.toRGB = function() {
        var r8 = (this.r * 255) | 0;
        var g8 = (this.g * 255) | 0;
        var b8 = (this.b * 255) | 0;
        return 'rgb(' + r8 + ',' + g8 + ',' + b8 + ')';
    }

    // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    function toHsl() {
        var r = this.r;
        var g = this.g;
        var b = this.b;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, l];
    }
}

/**
 * Creates a J3D.Color instance from  HSL color values to RGB.
 * Assumes h, s, and l are contained in the set [0, 1].
 *
 * Code adapted from:
 * http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  J3D.Color       The color object
 */
J3D.Color.fromHSL = function(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return new J3D.Color(r, g, b);
}

J3D.Color.createWhite = function() {
    return new J3D.Color(1, 1, 1, 1);
}

J3D.Color.white = new J3D.Color(1, 1, 1, 1);
J3D.Color.black = new J3D.Color(0, 0, 0, 1);

J3D.Color.red = new J3D.Color(1, 0, 0, 1);
J3D.Color.green = new J3D.Color(0, 1, 0, 1);
J3D.Color.blue = new J3D.Color(0, 0, 1, 1);
