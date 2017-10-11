const path = require('path')

module.exports = {
  webpack: {
    rules: {
      less: {
        data: '@import "_variables"',
        includePaths: [path.resolve('src/less')]
      }
    }
  }
}
