# Pipeline-UI-PoC

Steps to set up this PoC
--------------

Run this command in node env.
```sh
npm install
```

Following components are included:
 * [openui5](https://github.com/SAP/openui5). Run this command, 3 openui5 modules are download (Skip this step by using bootstrap from cloud, openui5 does not provide sub-lib like sap.suite.ui etc.):
```sh
npm install openui5/packaged-sap.m
npm install openui5/packaged-themelib_sap_belize
npm install openui5/packaged-themelib_sap_bluecrystal
```

 * [octicon](https://github.com/primer/octicons). Look up [here](https://octicons.github.com/) for icons you want to register. Run this command, 1 octicons module is download:
```sh
npm install octicons
```

 * [fontawesome](https://github.com/FortAwesome/Font-Awesome). Look up [here](http://fontawesome.io/cheatsheet/) for icons you want to register. Run this command, 1 font-awesome module is download:
```sh
npm install font-awesome
```

 * start up a web server (e.g. tomcat)
 * run index.html under folder  app/openui5
