# pipeline-ui-poc

Steps to set up Openui5 Version.

1. Install openUI5 via bower, see reference on TODO openui5 linkage on github.com. In this poc we need following components to be installed, just copy the this command:
	bower install openui5/packaged-sap.m
	package dependecy is taken care by bowr., meaning sap.ui.core is downloaded automatically
2. openui5 is loading resource dynamitically, start a web server for this (for example: tomcat)
