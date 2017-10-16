const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  webpack: {
    rules: {
      css: {
        modules: true,
        localIdentName: (isDev ? '[path][name]__[local]__' : '') + '[hash:base64:5]' // eslint-disable-line prefer-template
      }
    }
  }
}
