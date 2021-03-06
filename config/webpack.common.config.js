var path = require('path');
var nodeExternals = require('webpack-node-externals');

const client = {
  entry: path.join(__dirname, '..', 'client', 'client-entry.js'),
  output: {
    path: path.join(__dirname, '..', 'public', 'javascripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ]
      }
    ]
  },
};

const server = {
  externals: nodeExternals(),
  entry: path.join(__dirname, '..', 'src', 'App.js'),
  output: {
    path: path.join(__dirname, '..', "build"),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          //require.resolve('style-loader'),
          require.resolve('css-loader'),
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  plugins: []
};

module.exports = [client, server];
