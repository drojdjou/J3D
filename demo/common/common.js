function setLabels(title, desc) {
	
	document.write("<div id='header'>" + title + "</div>");
	
	document.write("<div id='madewith'>made with <a href='http://www.everyday3d.com/j3d' id='j3dlink'>J3D</a><br><a href='http://twitter.com/share' class='twitter-share-button' data-count='horizontal' data-via='bartekd'>Tweet</a><script type='text/javascript' src='http://platform.twitter.com/widgets.js'></script></div>");
		
	if(desc) 
		document.write("<div id='details'>" + desc + "</div>");
	
}


