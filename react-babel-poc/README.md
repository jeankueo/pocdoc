Steps to set up react babel PoC (3/4)
--------------
Prerequisite: nodeJS is installed

 * Download dependencies. Blue ocean design language will be downloaded by bower while others are referenced as node module.
```sh
npm run installAll
```
 * Run babel CLI to build ES6 to ES5 in amd module format. 
```sh
npm run babel
```
 * Run an HTTP server, middleware are installed in this js.
```sh
node server.js
```
 * Access by link [http://localhost:6543/react-babel-poc/public](http://localhost:6543/react-babel-poc/public)


Todos
--------------
- [x] install babel purely by nodejs
- [x] try out amd plugin for weather-icon. (be careful about .babelrc file. I abandoned it, instead i specify preset and plugins for babel in script. Because when i ran babel cli to build files from bower_component/jenkins-design-language, it's their .babelrc is effecting instead of mine, that's why i wasted much time wondering why my compiling result stay in commenJS format instead of AMD although i configured them in my .babelrc... specifying your config in command options are always safer...)
- [ ] try out drawing of weather-icons in html page by requirejs.
- [ ] try out drawing of PipelineGraph in html page by requirejs.
- [ ] think about merge to ui5.

Outcome
--------------
Prove to transform BO es6 react modules to amd modules.