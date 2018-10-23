var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: "styles.css",
});

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: 'build.js'
  },
  module: {
    rules: [
	  {
		test: /\.json$/,
        loader: 'json-loader',
        exclude: [/node_modules/, path.resolve( __dirname, 'config.json' )]
	  },
	  {
		test: /\.css$/,
        use: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
		exclude: /configs/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[hash].[ext]',
        }
      },
	  {
		test: /\.less$/, use: extractLess.extract({
          use: [
            { loader: "css-loader", options: { root: path.resolve(__dirname, './dist') } },
            { loader: "less-loader", options: {  root: path.resolve(__dirname, './dist') } },
          ],
        })
      },
    ]
  },
  plugins: [
    extractLess
  ],
  externals: {
	'electron': 'require("electron")'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
