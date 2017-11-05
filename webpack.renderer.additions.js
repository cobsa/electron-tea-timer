module.exports = {
  module: {
    loaders: [
      {
        test: /\.(?:png|jpg)$/,
        loader: 'url-loader',
        query: {
          // Inline images smaller than 10kb as data URIs        limit: 10000
        }
      }
    ]
  }
}
