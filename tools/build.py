#!/usr/bin/env python

import os, glob, sys, fileinput, shutil, time

srcfolder = "src"
shaderfile = "src/engine/ShaderSource.js"
output = "build/j3dt.js"
now = ""

def buildShaders():
	jsf = open(shaderfile, 'w')
	isw = False

	jsf.write("// File generated with util/buildShaders.py. Do not edit //\n\n")
	jsf.write("J3D.ShaderSource = {};\n\n")

	for infile in glob.glob( "src/shaders/*/*.glsl" ):
		# print "S %s" % infile
		glsl = open(infile, 'r')
		
#		for line in glsl:		
#			if line.strip().startswith("//#name "):
#				if isw:
#					jsf.write("\"\"].join(\"\\n\");\n\n")
#				jsf.write("J3D.ShaderSource." + line[7:len(line)].strip() + " = [\n")
#				jsf.write(	"\t\"" + line.strip() + "\",\n",)
#				isw = True
#			elif line.strip().startswith("// "):
#				pass # Don't copy comments
#			elif line.strip() == "":
#				jsf.write("\n")
#			else:
#				jsf.write(	"\t\"" + line.strip() + "\",\n",)

		for line in glsl:		
			if line.strip().startswith("//#name "):
				if isw:
					jsf.write("\";\n\n")
				jsf.write("J3D.ShaderSource." + line[7:len(line)].strip() + " = \"")
				jsf.write(line.strip() + "\\n")
				isw = True
			elif line.strip().startswith("// "):
				pass # Don't copy comments
			elif line.strip() == "":
				pass # Don't copy empty lines
			else:
				jsf.write(line.strip() + "\\n")
			
		glsl.close()
		if isw:
			jsf.write("\";\n\n")
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
				# print "J %s" % fname
	return jsf

def minifyWithClosure(jsf):
	_cmd =  "java -jar tools/build/compiler.jar --js_output_file %s --warning_level QUIET" % output
	_cmd += " --js lib/requestAnimationFrame.js --js lib/gl-matrix-1.3.7.js --js "
	_cmd += ' --js '.join(jsf)
	os.system(_cmd)

def finalizeBuild():
	os.system("cat tools/build/info.txt build/j3dt.js > build/j3d.js")

def cleanup():
	os.remove(output)

def incrementVersion():
	global now
	buildVersion = 0

	for line in fileinput.input('src/J3D.js', inplace=1):	
		if 'J3D.BUILD = ' in line:
			buildVersion = int(line[-4:-2])
			buildVersion += 1
			print '// Built on %s' % now
			print 'J3D.BUILD = %i;' % buildVersion
		else:
			print line,

	for line in fileinput.input('tools/build/info.txt', inplace=1):	
		if 'Build ' in line:
			print 'Build %i | %s' % (buildVersion, now)
		else:
			print line,

def build():
	global now
	now = time.asctime( time.localtime(time.time()) )
	print "[ Starting build at %s ]" % now

	print "[ Parsing shaders ]"
	buildShaders()
	print "[ Update version ]"
	incrementVersion()
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









