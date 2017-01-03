# webpack_basics

#Steps To Run

--> Go to the folder directory in terminal.
--> Install all the necessery packages.
	npm install
--> Run webpack
	webpack-dev-server

#Reference:
	https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.eltll9b2t
	https://webpack.js.org/configuration/
	http://webpack.github.io/docs
	
#Note: webpack takes modules with dependencies and generates static assets representing those modules.

#Install:
	npm install webpack -g (Install webpack globally)
	
	direct command to create the bundle.js file
		webpack ./app.js bundle.js
		
		
1)
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  }
}

entry --> name of the top level file or set of files that we want to include in our build, can be a single file or an array of files.
output ---> name of the file we want Webpack to build.

Note(webpack.config.js)(command: webpack):
	Once a webpack.config file is present, 
	the webpack command will build your application based on the configuration made available in the file.
	
2) watch mode:

	It will watch any change in the js file and do the build immediately as per the configuration file.
	
	It can be done in two ways.
	
	A) From command line : webpack --watch
	B) Through config file.
	
		module.exports = {
  			entry: "./app.js",
  			output: {
    			filename: "bundle.js"
  			}, 
  			watch: true
		}
	
	After watch is set to true, when you run the webpack command, webpack will rebuild your bundle when any of your files change.

3) Webpack Dev Server

	Install : npm install webpack-dev-server -g
	Run : webpack-dev-server
	
	Important note:
	The dev server uses Webpack’s watch mode. 
	It also prevents webpack from emitting the resulting files to disk. 
	Instead it keeps and serves the resulting files from memory.” 
	— This means that you will not see the webpack-dev-server build in bundle.js, 
	to see and run the build, you must still run the webpack command.
	
	##With Webpack dev server running, you will notice that if you go back to your app and make a change, the browser will automatically refresh (hot-loading).
	##To enable hot-loading and remove the App Ready status bar at the top, terminate the webpack-dev-server and rerun webpack-dev-server with the inline flag
		webpack-dev-server --inline

4) Building multiple files
	module.exports = {
  		entry: ["./global.js", "./app.js"],
  		output: {
    		filename: "bundle.js"
 	 	}
	}

5) Multiple entry and multiple bundle

	{
  		entry: {
    		app: './src/app.js',
    		search: './src/search.js'
  		},
  		output: {
    		filename: '[name].js',
    		path: __dirname + '/build'
  		}
	}

6) Webpack loaders and preloaders
	
	Note : Loaders allow you to preprocess files as you require() or “load” them. 
		   Loaders are kind of like “tasks” are in other build tools, and provide a powerful way to handle frontend build steps

module.exports = {
  //entry: "./app.js",
  entry: ["./global.js", "./app.js"], //Multiple entry files
  output: {
    filename: "bundle.js"
  },
  watch: true, // to do the webpack set ups in watch mode. default value is false
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
   ],
   loaders: [
     {
       test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
       	 cacheDirectory: true, 
         presets: ['react', 'es2015'] 
       }
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 }
}

A. test — a regular expression that tests what kind of files to run through this loader.
B. exclude — which files the loader should exclude /ignore.
C. loader — the name of the loader we are going to use.
D. query — You can pass options to the loader by writing them as a query string or by using the query property as we have done above.
E. cacheDirectory — Default false. When set, the given directory will be used to cache the results of the loader. Future webpack builds will attempt to read from the cache to avoid needing to run the potentially expensive Babel recompilation process on each run
F. presets — lets us use the react and es2015 presets that were installed earlier

Preloaders: Using JSHint with Webpack:
	
		preLoaders run before loaders do.

7) Creating a Start Script
	
	This is a feature of nodeJs.
		
		"scripts": {
  			"start": "webpack-dev-server"
		},

8) Separate production and development Builds:
	A. Production Webpack bundles
		To run a production bundle, letting webpack minify your code, run Webpack with a -p flag:
			webpack -p
			
	B. Separate config file.
		command to run the webpack with different config file.
		webpack --config webpack-production.config.js -p
