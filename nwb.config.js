const path = require('path')

module.exports = {
  webpack: {
    rules: {
      sass: {
        data: '@import "_variables"',
        includePaths: [path.resolve('scss')]
      }
    }
  }
}
