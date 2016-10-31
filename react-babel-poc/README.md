Steps to set up react PoC
--------------
Prerequisite: nodeJS is installed

 * Download dependencies. Blue ocean will be downloaded by bower while others are referenced as node module.
```sh
npm run installAll
```
 * Run webpack to build ES6 to ES5 -- only necessary for page index_es6_pre_process.html 
```sh
npm run webpack
```
 * Run an HTTP server, middleware are installed in this js.
```sh
node server.js
```
 * Access by link [http://localhost:6543/react-babel-poc/public](http://localhost:6543/react-babel-poc/public)


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
- [ ] install babel purely by nodejs
- [ ] try out amd plugin outcome for weather-icon.

Outcome
--------------
Prove to transform BO es6 react modules to amd modules.