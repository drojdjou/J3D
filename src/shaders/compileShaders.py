#!/usr/bin/env python

import glob, os

jsf = open("../renderers/ShaderSource.js", 'w')
isw = False

jsf.write("// File generated with src/shaders/compileShaders.py. Do not edit //\n\n")
jsf.write("J3D.ShaderSource = {};\n\n")

for infile in glob.glob( "*.glsl" ):
	
	glsl = open(infile, 'r')
	
	for line in glsl:
		
		if line.startswith("//# "):
			if isw:
				jsf.write("\"\"].join(\"\\n\");\n\n")
			jsf.write("J3D.ShaderSource." + line[4:len(line)].strip() + " = [\n")
			isw = True
		elif line.strip() == "":
			jsf.write("\n")
		else:
			jsf.write(	"\t\"" + line.strip() + "\",\n",)
		
	glsl.close()
	if isw:
		jsf.write("\"\"].join(\"\\n\");\n\n")
	isw = False
jsf.close()

