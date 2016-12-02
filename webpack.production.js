const webpack = require('webpack');
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false')),
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
  }
});
const dedupePlugin = new webpack.optimize.DedupePlugin();

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    index: './index.js'
  },
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
    library: 'react-async-child',
    umdNamedDefine: 'react-async-child'
  },
  debug: false,
  plugins: [
    definePlugin,
    dedupePlugin
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom'
  }
};
