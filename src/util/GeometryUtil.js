J3D.GeometryUtil = {

    randomNoise: function(geometry, force) {

        var vbo = geometry.arraysByName[J3D.Mesh.VERTEX_POSITION];
        var data = vbo.data;

        for(var i = 0; i < data.length; i++) {
            data[i] = data[i] + force * Math.random();
        }

        geometry.replaceArray(vbo, data);
    }

}