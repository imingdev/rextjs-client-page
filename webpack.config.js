/**
 * @intro: webpack配置.
 */
const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const nodeExternals = require('webpack-node-externals');

const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  mode: process.env.NODE_ENV,
  context: resolve('/'),
  entry: {
    Document: './src/Document.jsx',
    App: './src/App.jsx',
    Error: './src/Error.jsx'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(jsx?)$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'jsx',
        target: 'es2015'
      }
    }]
  },
  externals: nodeExternals(),
  plugins: [
    new WebpackBarPlugin()
  ],
  performance: {
    hints: false
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
