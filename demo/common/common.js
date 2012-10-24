var nowebglParagraph = "<div class='warning'>Your browser does not support webgl.<br>Please try latest Chrome or Firefox.</div>";

function setLabels(title, desc, madeBy) {

    var mb = (madeBy == null) ? true : false;

    document.write("<div id='header'>" + title + "</div>");

    if (!isLocalhost() && mb) {
        document.write("<div id='madewith'>made with <a href='https://github.com/drojdjou/J3D' id='j3dlink'>J3D</a><br><a href='http://twitter.com/share' class='twitter-share-button' data-count='horizontal' data-via='bartekd'>Tweet</a><script type='text/javascript' src='http://platform.twitter.com/widgets.js'></script></div>");
    }

    if (desc) {
        document.write("<div id='details'>" + desc + "</div>");
    }

}

function updateDesc(s) {
    document.getElementById("details").innerHTML = s;
}

function isLocalhost() {
    return document.location.host.indexOf("localhost") > -1;
}

function loadScript(src, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = callback;
    script.src = src;
    
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            callback();
        }
    }
    
    head.appendChild(script);
}

function Interactor() {

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

