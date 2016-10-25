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
 * Access by link [http://localhost:8765/react-poc/public](http://localhost:8765/react-poc/public)

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
- [x] manual set up of bundle tools (webpack, babel) etc.~~
- [x] add more loaders (css/img/jsx)~~
- [ ] load BO control
- [ ] compose some components
- [ ] think of ways to integrate to ui5 (possible?) -- one way could be, the controls are actually provided by @jenkinscd/design-language, after npm install, it's already built (maybe by gulp) into es5 react. Maybe a good way to consume and wrap it directly in openui5.
- [x] edit .gitignore to ignore files under asset~~
- [x] move webpack config file to config package~~
- [x] webpack works fine in mac/linux/windows~~