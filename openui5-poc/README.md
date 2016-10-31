Steps to set up openui5 PoC
--------------
Prerequisite: nodeJS is installed

 * Download dependencies
```sh
npm install
```
 * Run an HTTP server
```sh
node server.js
```
 * Access by link [http://localhost:9876/openui5-poc/public](http://localhost:9876/openui5-poc/public)

Todos
--------------
- [x] set up server.js
- [x] ~~import and bootstrap openui5 sub-lib as node modules~~
- [x] ~~import and bootstrap openui5 themes as node modules~~
- [x] import ui5 from hanaondemand
- [x] Pipeline control (several shape options)
- [x] three views
- [x] embed three views as sub view to index.view.xml
- [x] sort out data binding
- [x] selection of lists
- [x] search of list
- [ ] enhance search, filter number,text,build service names in pipeline view
- [ ] enhance search, filter more fields for repo view
- [ ] control bug (set test page in folder /test and fix)
- [ ] vertical scroll bars
- [x] finish token logic
- [x] finish two button enable logic
- [ ] think of button click confirm window, should show all operations in list in a good manner

Outcome
--------------
a PoC by using UI5 controls + self-developed Pipeline control.