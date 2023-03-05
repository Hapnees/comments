const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	devtool: 'inline-source-map',
	optimization: {
		usedExports: true,
	},
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(jpg|jpeg|png|svg|ico|webp|gif)$/, type: 'asset/resource' },
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		static: './dist',
		hot: true,
	},
}
