var webpack = require("webpack");

module.exports = {
	cache: true,
	entry: "./bingo.jsx",
	output: {		
		filename: "bundle.js"
	},
	devtool: "source-map",
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		]
	}
};