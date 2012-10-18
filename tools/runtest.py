#!/usr/bin/env python

import os, sys

if(__name__ == '__main__'):

	cwd = os.getcwd().split("/")[-1]
	if cwd == "tools":
		os.chdir('../')
	print os.getcwd()

	if len(sys.argv) > 1:
		tests = ','.join(sys.argv[1:])
	else:
		tests = "all"

	_cmd  = "java -jar tools/test/JsTestDriver.jar"
	_cmd += " --captureConsole"
	_cmd += " --verbose"
	_cmd += " --reset"
	_cmd += " --tests %s" % tests
	_cmd += " --config tools/jsTestDriver.conf"

	os.system(_cmd)