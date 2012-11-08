/**
 * Creates a webcam stream for use as a texture.
 *
 * @param callback this function will be invoked when the webcam stream is ready. It will have the video element with the stream passed as argument.
 *
 * Browsers that support this feature: Chrome, Opera Alpha Camera build
 */
J3D.UserStream = function(callback) {

    var n = window.navigator;
    var iswebkit = false;

    var stream = document.createElement('video');
    stream.autoplay = true;

    var onError = function(e) {
        console.log(e);
        throw J3D.Error.USER_STREAM_ERROR
    }

    var onSuccess = function(s) {
        if (!iswebkit) {
            stream.src = s;
        } else {
            stream.src = window.webkitURL.createObjectURL(s);
        }

        callback(stream);
    }

    if (n.getUserMedia) {
        n.getUserMedia({ video: true, audio: false, captureDelay: 2 }, onSuccess, onError);
    } else if (n.webkitGetUserMedia) {
        iswebkit = true;
        n.webkitGetUserMedia({audio:false, video:true}, onSuccess, onError);
    } else {
        throw J3D.Error.USER_STREAM_ERROR;
    }
}