module.exports = {
	context: __dirname,
	entry: "./main.js",

  output: {
      path: __dirname+'/public/build/',
      filename: "bundle.js"
  },
  target: 'node'
}
