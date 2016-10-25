Steps to set up react PoC
--------------
Prerequisite: nodeJS is installed

 * Download dependencies. Blue ocean will be downloaded by bower while others are referenced as node module.
```sh
npm run installAll
```
 * Run webpack to build ES6 to ES5
```sh
npm run webpack
```
 * Run an HTTP server, middleware are installed in this js.
```sh
node server.js
```

Other scripts
--------------
```sh
npm run storybook
```

```sh
npm run buildBo
```

Todos
--------------
* ~~manual set up of bundle tools (webpack, babel) etc.~~
* ~~add more loaders (css/img/jsx)~~
* load BO control
* compose some components
* think of ways to integrate to ui5 (possible?)
* ~~edit .gitignore to ignore files under asset~~
* ~~move webpack config file to config package~~
* ~~webpack works fine in mac/linux/windows~~