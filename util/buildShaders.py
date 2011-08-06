#!/usr/bin/env python

import glob, os

jsf = open("../src/engine/ShaderSource.js", 'w')
isw = False

jsf.write("// File generated with util/buildShaders.py. Do not edit //\n\n")
jsf.write("J3D.ShaderSource = {};\n\n")

for infile in glob.glob( "../src/shaders/*.glsl" ):
	
	glsl = open(infile, 'r')
	
	for line in glsl:
		
		if line.strip().startswith("//# "):
			if isw:
				jsf.write("\"\"].join(\"\\n\");\n\n")
			jsf.write("J3D.ShaderSource." + line[4:len(line)].strip() + " = [\n")
			isw = True
		elif line.strip().startswith("//"):
			jsf.write("") # Don't copy comments
		elif line.strip() == "":
			jsf.write("\n")
		else:
			jsf.write(	"\t\"" + line.strip() + "\",\n",)
		
	glsl.close()
	if isw:
		jsf.write("\"\"].join(\"\\n\");\n\n")
	isw = False
jsf.close()

