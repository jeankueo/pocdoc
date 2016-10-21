# Pipeline-UI-PoC

Steps to set up this PoC
--------------
Prerequisite: nodeJS and mvn are installed

 * Download dependencies
```sh
npm run installAll
```
This command create two folders in your project:
 -- node_modules with all modules.
 -- bower_components with blueocean plugin which is not a node module.

 * Run an http server
```sh
node server.js
```


To Run blueocean react storybook
--------------
```sh
npm run storybook
```