const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: [
		'./app/routes/routes.js'
	],
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "index_bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{test: /\.jsx?$/, use: {loader:'babel-loader', options:{presets: ["react","es2015"], plugins: ["transform-es2015-arrow-functions"]}}, exclude: [/node_modules/,/dist/,/test/]},
			{test: /\.css$/, use:['style-loader','css-loader']},
			{test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader','sass-loader']},
			{test: /\.(woff2?|jpe?g|png|gif|ico)$/, use: 'file-loader?name=./assets/images/[name].[ext]' },
			{test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader?name=./assets/fonts/[name].[ext]' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin()
	],
	node: {
	  fs: 'empty'
	}
};

module.exports = config;
