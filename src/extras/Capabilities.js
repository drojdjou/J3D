/**
    Returns values related to system capabilities

    @class Use this class to check if features like webgl or userStream are available
 */
J3D.Capabilities = {

    /**
     * true if webgl is supported
     */
    webgl: (function() {
        var ct = null;
        try {
            var cn = document.createElement('canvas');
            ct = cn.getContext('webgl') || cn.getContext('experimental-webgl');
        } catch(e) {
            console.log(e);
        }
        if (ct == null) {
            console.log("Context is null");
            return false;
        }
        else return true;
    })(),

    /**
     * true if userStream is supported
     */
    userStream:(window.navigator.getUserMedia != null) || (window.navigator.webkitGetUserMedia != null),

    /**
     * true if pointerLock is supported
     */
    pointerLock: ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document),

    /**
     * true if gamepad is supported
     */
    gamepad: !!navigator.webkitGamepads || !!navigator.webkitGetGamepads
}