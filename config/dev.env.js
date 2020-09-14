'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONDIG:'"dev"',
  BASE_API:'"http://digital.tq-service.com/tqdata"'
})
