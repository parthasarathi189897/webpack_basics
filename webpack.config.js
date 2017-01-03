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
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
    ],
    loaders: [
     {
       test: [/\.js$/, /\.es6$/],
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