# Pipeline-UI-PoC

See steps inside each PoC to setup. The whole PoC is divided into 4 phase:
* 1 openui5-poc. Setup a framework in openui5. Some self-written control is created to visualize pipeline.
* 2 react-webpack-poc. Try out Jenkins blueocean controls written in React. In this PoC weather-icons and PipelineGraph is tried out in ES6. This PoC can be used to learn basic knowledge of react.
* 3 react-babel-poc. Try out to transform Jekins Blueocean react module in to AMD (because openui5 follows AMD module bundle and ES5). This PoC can be usd to practise using React modules in ES5.
* 4 openui5-react-poc. TBD.

Proxy settings
--------------
 * for **npm**, these two lines for .npmrc in your user root folder:
``` sh
proxy=http://proxy.wdf.sap.corp:8080/
https-proxy=https://proxy.wdf.sap.corp:8080
```

 * for **bower**, put these two lines in .bowerrc which is a JSON structure in your project root folder:
``` json
"proxy": "http://proxy.wdf.sap.corp:8080",
"https-proxy": "http://proxy.wdf.sap.corp:8080"
```

 * for **mvn**, put these lines in your settings.xml in your user root folder /.m2:
``` xml
<proxies>
	<proxy>
		<id>http_proxy</id>
		<active>true</active>
		<protocol>http</protocol>
		<host>proxy.wdf.sap.corp</host>
		<port>8080</port>
	</proxy>
	<proxy>
		<id>https_proxy</id>
		<active>true</active>
		<protocol>https</protocol>
		<host>proxy.wdf.sap.corp</host>
		<port>8080</port>
	</proxy>
</proxies>
```

Upgrade node/npm via npm
--------------
``` sh
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
Only useful for **linux/mac**. For **windows** user you have to reinstall.