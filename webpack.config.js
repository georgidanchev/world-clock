const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: './src/assets', to: './assets' },
    ]),
  ],
}