Steps to set up react babel PoC (3/4)
--------------
Prerequisite: nodeJS is installed

 * Download dependencies. Blue ocean design language will be downloaded by bower while others are referenced as node module.
```sh
npm run installAll
```
 * Run gulp to build BO src, tasks including ES6 to ES5 in amd module format; translate LESS to CSS, copy svg files.
```sh
npm run gulp
```
 * Run an HTTP server, middleware are installed in this js.
```sh
node server.js
```
 * Access by link [http://localhost:6543/react-babel-poc/public](http://localhost:6543/react-babel-poc/public)

Other scripts
--------------
 * Run babel CLI to build ES6 to ES5 in amd module format. 
```sh
npm run babel
```

Todos
--------------
- [x] install babel purely by nodejs
- [x] try out amd plugin for weather-icon. (be careful about .babelrc file. I abandoned it, instead i specify preset and plugins for babel in script. Because when i ran babel cli to build files from bower_component/jenkins-design-language, it's their .babelrc is effecting instead of mine, that's why i wasted much time wondering why my compiling result stay in commenJS format instead of AMD although i configured them in my .babelrc... specifying your config in command options are always safer...)
- [x] Setup gulp, use it to build all (copy, less->css, babel compile...., copy from jenkins/design-language, rename)
- [x] try out drawing of weather-icons in html page by requirejs. Reference: [https://facebook.github.io/react/docs/react-without-es6.html](https://facebook.github.io/react/docs/react-without-es6.html) [http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/)
- [x] note that, in ubantu, task copy-icons does not need to replace space with '%20'; but in windows/mac, this task should be replaced by task copy-icons-replace-space.
- [ ] try out drawing of PipelineGraph in html page by requirejs. Reference: [http://remarkablemark.org/blog/2016/09/24/react-requirejs-amd/](http://remarkablemark.org/blog/2016/09/24/react-requirejs-amd/)
- [ ] think about merge to ui5.

Outcome
--------------
Prove to transform BO es6 react modules to amd modules. And PoC code is written in ES5.