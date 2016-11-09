Steps to set up openui5-react PoC (4/4)
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
 * Access by link [http://localhost:76547/openui5-react-poc/public](http://localhost:7654/openui5-react-poc/public)

Todos
--------------
- [x] use requirejs to integrate amd bo to ui5.
- [x] Ref to this article: [http://www.ryadel.com/en/css-namespaces-avoid-conflict-style-sheets-files/](http://www.ryadel.com/en/css-namespaces-avoid-conflict-style-sheets-files/), create own LESS and add namespace to avoid conflict of BO css and UI5 css.
- [x] adjust data to support both d3 pipeline and new bo pipeline control.
- [x] adjust summary page, use weather icons instead of ui5 control.
- [x] remove vscroll bar on app level (overflow: hidden)
- [ ] move vscroll bar from view level on to list level
- [x] add a category dropdown in front of search on pipeline page (e.g. Fiori standard pipeline)
- [ ] enhance search function (fuzzy) of pipeline page
- [ ] add an organization + git/gerrit + all selection dropdown in front of search on repo page.
- [ ] enhance search function (fuzzy) of repo page
- [ ] add navigation function to pipeline page list items, a page to edit pipeline, and see more details about it
- [ ] add navigation function to repo page list items, a page to see more detail of running status
- [ ] finish active button pop
- [ ] finish deactive button pop
- [x] move add git input to a pop triggered by popover
- [x] mix github/gitgerrit tables
- [ ] change to bage style, line items become like link + bages + a diagram
- [ ] adjust css to be more close to blue ocean theme