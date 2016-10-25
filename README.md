# Pipeline-UI-PoC

See steps inside each PoC to setup.

Proxy settings
--------------
 * for npm, these two lines for .npmrc in your user root folder:
```
proxy=http://proxy.wdf.sap.corp:8080/
https-proxy=https://proxy.wdf.sap.corp:8080
```

 * for bower, put these two lines in .bowerrc which is a JSON structure in your project root folder:
```
"proxy": "http://proxy.wdf.sap.corp:8080",
"https-proxy": "http://proxy.wdf.sap.corp:8080"
```

 * for mvn, put these lines in your settings.xml in your user root folder /.m2:
```
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
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```