J3D.Interactor = function () {

    var that = this;

    var moveevent = 'mousemove';

    // Raw mouse coordinates
    this.pageX = 0;
    this.pageY = 0;

    // Normalized mouse coordinates [ 0 to 1 ]
    this.normX = 0;
    this.normY = 0;

    // Normalized and centered mouse coodinates [ -1 to 1 ]
    this.centerX = 0;
    this.centerY = 0;

    var mousemove = function(e) {

        that.pageX = e.pageX;
        that.pageY = e.pageY;

        that.normX = e.pageX / window.innerWidth;
        that.normY = e.pageY / window.innerHeight;

        that.centerX = that.normX * 2 - 1;
        that.centerY = that.normY * 2 - 1;
    }

    this.destroy = function() {
        document.removeEventListener(moveevent, mousemove, null);
    }

    document.addEventListener(moveevent, mousemove, null);
}