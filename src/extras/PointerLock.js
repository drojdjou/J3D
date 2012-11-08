J3D.PointerLock = function() {

    var that = this;
    var element;

    this.deltaX = 0;
    this.deltaY = 0;

    this.pointerLocked = false;

    document.addEventListener('pointerlockchange', lockChange, false);
    document.addEventListener('mozpointerlockchange', lockChange, false);
    document.addEventListener('webkitpointerlockchange', lockChange, false);

    function lockChange() {
        console.log("lockChange");

        if (document.pointerLockElement === element ||
            document.mozPointerLockElement === element ||
            document.webkitPointerLockElement === element) {

            document.addEventListener("mousemove", lockMove, false);
            that.pointerLocked = true;
            console.log("> locked!");
        } else {
            document.removeEventListener("mousemove", lockMove, false);
            that.pointerLocked = false;
            console.log("> unlocked!");
        }
    }

    function lockMove(e) {
        that.deltaX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        that.deltaY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    }

    this.clear = function() {
        this.deltaX = this.deltaY = 0;
    }

    this.requestLock = function(e) {
        e.requestPointerLock = e.requestPointerLock ||
            e.mozRequestPointerLock ||
            e.webkitRequestPointerLock;
        e.requestPointerLock();

        element = e;
    }

    this.releaseLock = function() {
        document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock;
        document.exitPointerLock();
    }
}