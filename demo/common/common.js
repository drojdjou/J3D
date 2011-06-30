function setLabels(title, desc) {
	
	document.write("<div id='header'>" + title + "</div>");
	
	document.write("<div id='madewith'>made with <a href='http://www.everyday3d.com/j3d' id='j3dlink'>J3D</a></div>");
		
	if(desc) 
		document.write("<div id='details'>" + desc + "</div>");
	
}
