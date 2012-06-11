#!/usr/bin/env python

import os

os.system('java -Djsdoc.dir=. -jar ./docs/jsrun.jar ./docs/app/run.js -t=docs/templates/jsdoc/ -x=js,glsl -r=5 ../src/ -d=../apidocs/');