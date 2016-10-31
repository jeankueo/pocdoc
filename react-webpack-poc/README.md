Steps to set up react-webpack PoC (2/4)
--------------
Prerequisite: nodeJS is installed.

 * Download dependencies.
```sh
npm install
```
After this step, folder **node_modules** is created.
 * Run webpack to build ES6 to ES5
```sh
npm run webpack
```
Jenkins developer made a stupid decision that they put a space in an svg file name. To run webpack successfully, you have to rename the file 'node_modeules/@jenkins-cd/design-language/dist/assets/icons/weather/Partially Sunny.svg' to 'Partially%20Sunny.svg' manually, before executing this command. Hopefully someday later they will change it.
After this step, folder **dist** is created.
 * Run an HTTP server, middleware are installed in this js.
```sh
node server.js
```
 * Access by link [http://localhost:8765/react-webpack-poc/public](http://localhost:8765/react-webpack-poc/public)
 es6 pre-process page works, babel standalone does not work yet.

Other scripts
--------------
```sh
npm run storybook
```

```sh
npm run buildBo
```
These two commands do not work anymore, they are written when I was trying to use dashboard. But design-language is proved to be the right lib tu use. 

Todos
--------------
- [x] manual set up of bundle tools (webpack, babel) etc.
- [x] add more loaders (css/img/jsx)
- [x] load BO control -- tryout success on icon from module react-material-icons-blue
- [x] try out WeatherIcon in es6
- [x] try out PipelineGraph in es6
- [x] try out PipelineGraph in es6 with parallel stage + event handle
- [ ] ~~try out WeatherIcon in es5~~
- [ ] ~~try out PipelineGraph in es5~~
- [ ] ~~think of ways to integrate to ui5 (possible?) -- one way could be, the controls are actually provided by @jenkinscd/design-language, after npm install, it's already built (maybe by gulp) into es5 react. Maybe a good way to consume and wrap it directly in openui5.~~
- [x] edit .gitignore to ignore files under asset
- [x] move webpack config file to config package
- [x] webpack works fine in mac/linux/windows
- [ ] ~~in jdl weather-icon need xxx.css be loaded, and .css load .svg, but some file 'Patial Sunny.svg' contains a white space what is escaped in webpack loader, by rename it to 'Patial%20Sunny.svg' this problem is proved tobe solved, still, need to fix the escaping of empty char problem. ~~
- [ ] try out standalone babel page.

Outcome
--------------
Proved how to use Blueocean React modules in ES6. Webpack is used to do pre-processing of ES6 file. Runtime compiling should also be possible by including babel, but it hurts performace. I stopped investigation on runtime compiling, but page inline_process.html is still kept for potential future evaluation.