
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'directed-graph-editor.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000
  }
};
