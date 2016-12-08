# Pipeline-UI-PoC

Cloudfoundry Deployment
--------------
* As a precondition, mongodb backing service should be started on your cf space. Sample commands:
```sh
cf login -a-u-o-s-p....    // log on to your cf space
cf marketplace // to see if mongodb is provided with which plan
cf s  // to see running services
cf a  // to se  running applications
cf create-service mongodb v3.0-container pipeline-db  // creating backing service named 'pipeline-db' which is needed in our db module
```

* Access web module by link [https://ciconnect-pipeline-web.cfapps.sap.hana.ondemand.com/public](https://ciconnect-pipeline-web.cfapps.sap.hana.ondemand.com/public/)
* Chrome works well, IE has problem with undefined 'Object.assign' and 'Symbol undefined'. Hopefully polyfill feature of babel can solve it.

Local Install
--------------
* This step if optional. If you are behind SAP Corporate network, please add settings as following. Note that do not commit these two proxy settings into git, because it would effect build service.:
	* .bowerrc in root folder.
	* .npmrc in root folder and /db folder.

``` json
	 	{
	 		"proxy": "http://proxy.wdf.sap.corp:8080",
			"https-proxy": "http://proxy.wdf.sap.corp:8080"
	 	}
```
	
``` sh
		registry=http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.releases.npm/
```

* Install this node project, following things are triggered to build web module by this command
 	* install all dependencies in to folder **'/node_modules'**
	* download blue ocean design language project via bower into folder **'/bower_components'**
	* build translate blue ocean control in JSX+ES6 to ES5 in format of AMD module bundle into folder **'/web/dist'**
	* translate blue ocean LESS to CSS, and wrap it with 'jenkinsbo' namespace into folder **'/web/dist'**
	* copy blue ocean svg files into folder **'/web/dist'**
	* copy font files of oct + fontawsome to **'/web/dist'**
``` sh
npm install
```

* Run a server for web module
``` sh
npm start
```
* Access web module by link [http://localhost:3000/web/public](http://localhost:3000/web/public)

* Install mongodb from [https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)
* Create your database folder like "c:\mongodata". Start mongo db by command:
``` sh
mongod --dbpath "c:\mongodata"
```

* Run a server for db module
``` sh
cd db
npm start
```
 * Restful api of the database can be tested on local server at port 5000 [http://localhost:5000](http://localhost:5000)

web Module Design
--------------
 * View Structure, Transition and Routing of views:
 ![](./doc/vsd/01.view.PNG)
 * Wrapper of React control: **sap.ciconnect.control.BOControl**. This is a general wrapper. Any control provided by blue ocean can be used via this wrapper. Only specify following things:
 	* properties:
 		* **moduleName**: name of the module (file) under dist/bo/js. For example: PipelineGraph.
 		* **controlName**: name of the control. One module is possible to export several controls. For example: weather-icon module contains several controls.
 		* **props**: This is an object of react property. In general data is fed here. Please refer to blue ocean modules (under folder bower_components/jenkins-design-language/src/js/components) for props detail.
 	* aggregations:
 		* **boEvents**:react control event is impelemented in here. Because BOControl is a general wrapper, event names cannot be predefined in event{} block. So this multiple aggregation is defined to wrap events. For each event defined by react control, add an aggregation instance of BOEvent, simply specify event name and provide handler would work.
 	Example:
 ``` xml
<ci:BOControl moduleName="PipelineGraph" controlName="PipelineGraph" props="{pipeline>abstract}">
	<ci:boEvents>
		<ci:BOEvent name="onNodeClick" handle="onPipelineNodeClick" />
	</ci:boEvents>
</ci:BOControl>
```	

db Module Design
--------------
TODO

Useful links
--------------
* Octicons list: [https://octicons.github.com/](https://octicons.github.com/)
* Fontawesome icon list: [http://fontawesome.io/icons/](http://fontawesome.io/icons/)
* Jenkins Design Language controls: [http://jenkinsci.github.io/jenkins-design-language/docs](http://jenkinsci.github.io/jenkins-design-language/docs)

Done Tasks
--------------
- [x] use requirejs to integrate amd bo to ui5.
- [x] Ref to this article: [http://www.ryadel.com/en/css-namespaces-avoid-conflict-style-sheets-files/](http://www.ryadel.com/en/css-namespaces-avoid-conflict-style-sheets-files/), create own LESS and add namespace to avoid conflict of BO css and UI5 css.
- [x] adjust data to support both d3 pipeline and new bo pipeline control.
- [x] adjust summary page, use weather icons instead of ui5 control.
- [x] remove vscroll bar on app level (overflow: hidden)
- [x] move vscroll bar from view level on to list level
- [x] add a category dropdown in front of search on pipeline page (e.g. Fiori standard pipeline)
- [x] enhance search function of pipeline page
- [x] add an organization + git/gerrit + all selection dropdown in front of search on repo page.
- [x] enhance search function of repo page
- [x] finish delete git repo pop
- [x] finish active button pop - consume the new models
- [x] finish deactive button pop - consume the new models
- [x] move add git input to a pop triggered by popover
- [x] mix github/gitgerrit tables
- [x] change repo view to bage style, line items become like link + bages + pipelinegraph
- [x] change pipeline view to bage style, line items become like link + bages + pipelinegraph
- [x] linkage / event navigation of repo/pipeline page
- [x] add navigation function to pipeline page list items, a page to edit pipeline, and see more details about it
- [x] add navigation function to repo page list items, a page to see more detail of running status
- [x] add bookmarkable tab
- [x] add bookmarkable search
- [x] event handling of BOControl in general
- [x] deploy to cf
- [x] detail page of repo (use children data of BO pipelinegraph control)
- [x] detail page of repo (use control sap.uxap.ObjectPageLayout and forms)
- [x] add db (json-based)

TODO Tasks
--------------
- [ ] HCP - Classic: integrate with github
- [ ] HCP - Classic: integrate with git/gerrit
- [x] UI: try out [n-odata-server](https://blogs.sap.com/2015/11/14/odata-server-for-nodejs/)
- [ ] UI: embed BOControl in BOControl (use page & page-header controls)
- [ ] UI: detail page of pipeline (use BOControl container features)
- [ ] UI: detail page of pipeline - has dependency: use pipeline editor control, comming soon by jenkins DL
- [ ] UI: detail page of repo -  think about an activation button on header, and more forms in body to provide sufficient information to really activate pipeline on the repo
- [ ] UI: legend page
- [ ] KT: knowledge transfer of poc 
- [ ] KT: know-how to department (19th Dec.  1h)
- [ ] BUG: use babel polyfill to provide functions like Object.assign(), Symbol for stupid IE.
