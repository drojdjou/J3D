#!/usr/bin/env python

import os, glob, sys, shutil

srcfolder = "src"
shaderfile = "src/engine/ShaderSource.js"
output = "build/j3dt.js"

def buildShaders():
	jsf = open(shaderfile, 'w')
	isw = False

	jsf.write("// File generated with util/buildShaders.py. Do not edit //\n\n")
	jsf.write("J3D.ShaderSource = {};\n\n")

	for infile in glob.glob( "src/shaders/*/*.glsl" ):
		# print "S %s" % infile
		glsl = open(infile, 'r')
		
		for line in glsl:		
			if line.strip().startswith("//#name "):
				if isw:
					jsf.write("\"\"].join(\"\\n\");\n\n")
				jsf.write("J3D.ShaderSource." + line[7:len(line)].strip() + " = [\n")
				jsf.write(	"\t\"" + line.strip() + "\",\n",)
				isw = True
			elif line.strip().startswith("// "):
				pass # Don't copy comments
			elif line.strip() == "":
				jsf.write("\n")
			else:
				jsf.write(	"\t\"" + line.strip() + "\",\n",)
			
		glsl.close()
		if isw:
			jsf.write("\"\"].join(\"\\n\");\n\n")
		isw = False

	jsf.close()
	print "[ Shaders saved to %s ]" % shaderfile

def listSourceFiles():
	jsf = []
	for root, dirs, files in os.walk(srcfolder):
		for name in files:
			fname = os.path.join(root, name)
			if name[-2:] == "js":
				jsf.append(fname)
				print "J %s" % fname
	return jsf

def minifyWithClosure(jsf):
	_cmd =  "java -jar tools/build/compiler.jar --js_output_file %s --warning_level QUIET" % output
	_cmd += " --js lib/requestAnimationFrame.js --js lib/gl-matrix.js --js "
	_cmd += ' --js '.join(jsf)
	os.system(_cmd)

def finalizeBuild():
	os.system("cat tools/build/info.txt build/j3dt.js > build/j3d.js")

def cleanup():
	os.remove(output)

def build():
	

	print "[ Parsing shaders ]"
	buildShaders()
	print "[ Getting JS source files ]"
	f = listSourceFiles()
	print "[ Minifying ]"
	minifyWithClosure(f)
	print "[ Finalizing build ]"
	finalizeBuild()
	print "[ Cleanup ]"
	cleanup()

# # # # # #
if(__name__ == '__main__'):
	cwd = os.getcwd().split("/")[-1]
	if cwd == "tools":
		os.chdir('../')

	build()

	if len(sys.argv) == 2:
		if os.path.exists(sys.argv[1]):
			shutil.copy("build/j3d.js", sys.argv[1])









