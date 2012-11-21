J3D.AnimationUtil = {};

J3D.AnimationUtil.createAnimationData = function(props) {
    var data = {
        "properties": {
        }
    };

    for(var i = 0; i < props.length; i++) {
        data.properties[props[i]] = [];
    }

    return data;
}