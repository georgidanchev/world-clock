module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.html/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
  },
}