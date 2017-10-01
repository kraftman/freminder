module.exports = {
	context: __dirname+'/react',
	entry: "./main.js",

  output: {
      path: __dirname+'/public/build/',
      filename: "bundle.js"
  },
	module: {
    loaders: [
      { test: /\.js$/,
				 loader: 'babel-loader',
				  exclude: /node_modules/,
					query:
			      {
			        presets:['react']
			      }
			},
      {
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				}
    ]
  }
}
