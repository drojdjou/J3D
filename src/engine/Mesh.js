/**
    Creates a new Geometry

    @class <p>A Mesh is a structured geometry coming from and external source (either a JSON file or generated with code). Typically a Mesh is designed to hold data about 3D objects. It has a primary set of attributes that will be interpreted by name:
    <ul>
    <li>vertices (3 x float)</li>
    <li>colors (4 x float)</li>
    <li>normals (3 x float)</li>
    <li>uv1 (2 x float)</li>
    <li>uv2 (2 x float)</li>
    </ul>

    No attribute is mandatory, but the shader that is being used might expect them to exist in the mesh. If an attribute named "tris" is present it will be interpreted as the elements array.</p>

    <p>WARNING: Other attributes in the "source" will be ignored. Mesh extends Geometry, so more attributes can be added manually if necessary.</p>

    @augments J3D.Geometry

 */
J3D.Mesh = function(source) {
    that = this;

    J3D.Geometry.call(this);

    this.hasUV1 = false;
    this.boundingBox;

    this.calculateBoundingBox = function() {
        var v = source["vertices"];

        var b = {
            minX:Number.MAX_VALUE, maxX:-Number.MIN_VALUE,
            minY:Number.MAX_VALUE, maxY:-Number.MIN_VALUE,
            minZ:Number.MAX_VALUE, maxZ:-Number.MIN_VALUE
        };

        for (var i = 0; i < v.length; i += 3) {
            b.minX = Math.min(b.minX, v[i + 0]);
            b.maxX = Math.max(b.maxX, v[i + 0]);

            b.minY = Math.min(b.minY, v[i + 1]);
            b.maxY = Math.max(b.maxY, v[i + 1]);

            b.minZ = Math.min(b.minZ, v[i + 2]);
            b.maxZ = Math.max(b.maxZ, v[i + 2]);
        }

        this.boundingBox = b;
    }

    for (var attr in source) {
        switch (attr) {
            case "vertices":
                this.vertexPositionBuffer = this.addArray(J3D.Mesh.VERTEX_POSITION, new Float32Array(source[attr]), 3, gl.DYNAMIC_DRAW);
               break;
            case "colors":
                if (source[attr].length > 0) this.addArray("aVertexColor", new Float32Array(source[attr]), 4);
                break;
            case "normals":
                if (source[attr].length > 0)
                    this.vertexNormalBuffer = this.addArray("aVertexNormal", new Float32Array(source[attr]), 3);
                else
                    this.vertexNormalBuffer = this.addArray("aVertexNormal", new Float32Array(this.size * 3), 3);
                break;
            case "uv1":
                if (source[attr].length > 0) {
                    this.textureCoordBuffer = this.addArray("aTextureCoord", new Float32Array(source[attr]), 2);
                } else {
                    this.textureCoordBuffer = this.addArray("aTextureCoord", new Float32Array(this.size * 2), 2);
                }
                this.hasUV1 = true;
                break;
            case "uv2":
                if (source[attr].length > 0) this.addArray("aTextureCoord2", new Float32Array(source[attr]), 2);
                break;
            case "tris":
                if (source[attr].length > 0) this.addElement(new Uint16Array(source[attr]));
                break;
            case "tangents":
                if (source[attr].length > 0) this.addArray("aVertexTangent", new Float32Array(source[attr]), 4);
                break;
            default:
                throw "WARNING! Unknown attribute in geometry: " + attr;
                break;
        }
    }

    this.flip = function() {

        var tv = [], tn = [], tu = [];
        var v = this.vertexPositionBuffer.data;
        var n = this.vertexNormalBuffer.data;
        var i;

        for (i = 0; i < v.length; i += 3) {
            tv.push(v[i], v[i + 2], v[i + 1]);
            tn.push(n[i], n[i + 1], n[i + 2]);
        }

        this.replaceArray(this.vertexPositionBuffer, new Float32Array(tv));
        this.replaceArray(this.vertexNormalBuffer, new Float32Array(tn));

        return this;
    }
}

J3D.Mesh.prototype = new J3D.Geometry();
J3D.Mesh.prototype.constructor = J3D.Mesh;
J3D.Mesh.prototype.supr = J3D.Geometry.prototype;

J3D.Mesh.VERTEX_POSITION = "aVertexPosition";

