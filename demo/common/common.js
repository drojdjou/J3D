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
    script.src = src + "?cb=" + Math.random();
    
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            callback();
        }
    }
    
    head.appendChild(script);
}

