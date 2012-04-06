/**
 *  Supports Webcam
 *  Browsers: Chrome Canary, Opera Alpha Camera build
 */

function UserStream(_callback, _settings) {

    var settings = _settings || {};


    var that = this;

    var n = window.navigator;
    var is_webkit = false;

    this.output = document.createElement('video');
    this.output.autoplay = true;

    var onError = function(e) {
        console.log("UserStream error: " + e);
    }


    var onSuccess = function(stream) {
        if (!is_webkit) {
            that.output.src = stream;
        } else {
            that.output.src = window.webkitURL.createObjectURL(stream);
        }

        _callback.call();
    }

    if (n.getUserMedia) {
        n.getUserMedia({video: true, audio: false, captureDelay:2}, onSuccess, onError);
    } else if (n.webkitGetUserMedia) {
        is_webkit = true;
        n.webkitGetUserMedia('video', onSuccess, onError);
    } else {
        console.log("UserStream error: user media not supported.");
    }
}