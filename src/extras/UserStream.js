/**
 * Creates a webcam stream for use as a texture.
 *
 * @param callback this function will be invoked when the webcam stream is ready. It will have the video element with the stream passed as argument.
 */
 J3D.UserStream = function(callback) {

    var n = window.navigator;

    var stream = document.createElement('video');
    stream.autoplay = true;

    var onError = function(e) {
        console.log(e);
        throw J3D.Error.USER_STREAM_ERROR
    }

    var onSuccess = function(s) { 
        stream.srcObject = s;

        stream.onloadedmetadata = () => {
            stream.play();
        };

        callback(stream);
    }

    if (n.mediaDevices) {
        n.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false }).then(onSuccess).catch(onError);
    } else {
        throw J3D.Error.USER_STREAM_ERROR;
    }
}