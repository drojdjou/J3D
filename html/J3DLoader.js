J3D = {};

J3D.Loader = {};

J3D.Loader.loadJSON = function(path, onLoadedFunc) {

    var request = new XMLHttpRequest();
    request.open("GET", path);

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            onLoadedFunc.call(null, JSON.parse(request.responseText));
        }
    }

    request.send();
}

J3D.Loader.loadPlainText = function(path, onLoadedFunc) {

    var request = new XMLHttpRequest();
    request.open("GET", path);

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            onLoadedFunc.call(null, request.responseText);
        }
    }

    request.send();
}


//render,scene,jscene,jmeshes,jsanim
J3D.Loader.parseJSONScene = function(renderer, scene, jscene, jmeshes, jsanim) {

    var a = jscene.ambient;
    var ambient = new THREE.AmbientLight(new THREE.Color(a.r, a.g, a.b));
    scene.add(ambient);

    var bg = jscene.background;
    renderer.setClearColor(new THREE.Color(bg.r, bg.g, bg.b));

    for (var mi in jmeshes) {

        var g = new THREE.Geometry();

        var vs = jmeshes[mi].vertices;
        for(var i = 0, n = vs.length; i < n; i += 3) {
            g.vertices.push(new THREE.Vector3(vs[i], vs[i+1], vs[i+2]));
        }

        var ns = jmeshes[mi].indices;
        for(var i = 0, n = ns.length; i < n; i += 3) {
            g.faces.push(new THREE.Face3(ns[i], ns[i+2], ns[i+1]));
        }

        // add uvs, colors etc...

        g.computeFaceNormals();
        // g.computeBoundingSphere();
        g.normalsNeedUpdate = true;

        jmeshes[mi] = g;
    }

    // ----- unsupported
    // if (jsanim) {
    //     for (var i in jsanim) {
    //         jsanim[i] = new J3D.Animation(jsanim[i]);
    //     }
    // }

    // for (var txs in jscene.textures) {
    //     var tx = new J3D.Texture(jscene.path + jscene.textures[txs].file);
    //     jscene.textures[txs] = tx;
    // }

    // if (jscene.lightmaps) {
    //     J3D.LightmapAtlas = [];
    //     for (var i = 0; i < jscene.lightmaps.length; i++) {
    //         var tx = new J3D.Texture(jscene.path + jscene.lightmaps[i]);
    //         J3D.LightmapAtlas.push(tx);
    //     }
    // }

    for (var ms in jscene.materials) {
        var md = jscene.materials[ms];

        var cd = md.color;
        var c = new THREE.Color(cd.r, cd.g, cd.b);

        var m;

        switch(md.type) {
            case "Phong":
                m = new THREE.MeshPhongMaterial({ color: c });
                break;
            case "Gouraud":
                m = new THREE.MeshLambertMaterial({ color: c });
                break;
        }

        m.j3dData = md;

        m.shininess = md.shininess;

        // m = J3D.Loader.fetchShader(m.type, m);
        // m.color = J3D.Loader.fromObject(J3D.Color, m.color);

        // if (m.emissive) m.emissive = J3D.Loader.fromObject(J3D.Color, m.emissive);

        // if (m.textureTile) m.textureTile = J3D.Loader.v2FromArray(m.textureTile);
        // if (m.textureOffset) m.textureOffset = J3D.Loader.v2FromArray(m.textureOffset);

        // if (m.colorTexture) {
        //     m.colorTexture = jscene.textures[m.colorTexture];
        //     m.hasColorTexture = true;
        // }

        jscene.materials[ms] = m;
    }

    // for (var lgs in jscene.lights) {
    //     var lg = jscene.lights[lgs];
    //     lg = J3D.Loader.fromObject(J3D.Light, lg);
    //     lg.color = J3D.Loader.fromObject(J3D.Color, lg.color);
    //     jscene.lights[lgs] = lg;
    // }

    // for (var cms in jscene.cameras) {
    //     var cm = jscene.cameras[cms];
    //     // var c = new THREE.PerspectiveCamera({fov:cm.fov, near:cm.near, far:cm.far});
    //     // c.j3dData = cm;
    //     // jscene.cameras[cms] = c;
    // }

    // var addCollider = function(t) {
    //     var cd = t.collider;
    //     switch (cd.type) {
    //         case "box":
    //             var s = J3D.Loader.v3FromArray(cd.size);
    //             var c = J3D.Loader.v3FromArray(cd.center);
    //             t.collider = J3D.Collider.Box({
    //                 minX: c.x + s.x * -0.5,
    //                 maxX: c.x + s.x * 0.5,
    //                 minY: c.y + s.y * -0.5,
    //                 maxY: c.y + s.y * 0.5,
    //                 minZ: c.z + s.z * -0.5,
    //                 maxZ: c.z + s.z * 0.5
    //             });
    //             break;
    //         case "sphere":
    //             var c = J3D.Loader.v3FromArray(cd.center);
    //             t.collider = J3D.Collider.Sphere(cd.radius, c);
    //             break;
    //         case "mesh":
    //             t.collider = J3D.Collider.Mesh(jmeshes[cd.mesh]);
    //             break;
    //     }


    // }

    // ----- unsupported

    for (var i = 0; i < jscene.transforms.length; i++) {
        var td = jscene.transforms[i];

        var t;

        if (td.mesh) t = new THREE.Mesh();
        else if(td.camera) t = new THREE.PerspectiveCamera();
        else t = new THREE.Object3D();

        t.j3dData = td;
        t.name = td.name;

        var p = td.position;
        t.position.set(p[0], p[1], p[2]);

        if(jscene.quaternions) {
            var r = td.rotation;
            t.quaternion.set(r[0], r[1], r[2], r[3]);
        } else {
            console.warn('Euler rotations are not supported, use quaternions!');
        }

        if(t.scale instanceof Array) {
            var s = td.scale;
            t.scale.set(s[0], s[1], s[2]);
        }

        if(td.mesh) t.geometry = jmeshes[td.meshId];
        if(td.renderer) t.material = jscene.materials[td.renderer];

        // if (t.animation) t.animation = jsanim[t.animation];
        // if (t.light) t.light = jscene.lights[t.light];

        // if (t.collider) {
        //     addCollider(t);
        // }

        if (td.camera) {
            var c = jscene.cameras[td.camera];
            t.fov = c.fov;
            t.near = c.near;
            t.far = c.far;
            t.aspect = window.innerWidth / window.innerHeight;
            t.updateProjectionMatrix();
        }

        jscene.transforms[i] = t;
    }

    var findByUID = function(n) {
        for (var i = 0; i < jscene.transforms.length; i++) {
            if (jscene.transforms[i].j3dData.uid == n) return jscene.transforms[i];
        }
    }

    for (var i = 0; i < jscene.transforms.length; i++) {
        var t = jscene.transforms[i];
        if (t.j3dData.parent != null) {
            t.parent = findByUID(t.j3dData.parent);
            t.parent.add(t);
        } else {
            scene.add(t);
        }
    }
}

J3D.Loader.v2FromArray = function(arr) {
    return new THREE.Vector3(arr[0], arr[1]);
}

J3D.Loader.v3FromArray = function(arr) {
    return new THREE.Vector3(arr[0], arr[1], arr[2]);
}

J3D.Loader.quatFromArray = function(arr) {
    return new THREE.Quaternion(arr[0], arr[1], arr[2], arr[3]).normalize();
}

J3D.Loader.loadGLSL = function(path, onLoadedFunc) {
    var request = new XMLHttpRequest();
    request.open("GET", path + '?' + Math.random());

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            onLoadedFunc.call(null, J3D.ShaderUtil.parseGLSL(request.responseText));
        }
    }

    request.send();
}
