const { proxy } = require('../utils')
const createAxios = require('./axios')

function Request(instanceConfig) {
  this.defaults = instanceConfig
  // init axios
  const axios = createAxios(instanceConfig)
  // proxy
  proxy(this, '_axios', axios)
}

Request.prototype.request = function (config) {
  return this._axios({
    ...config,
    url: config.url || this.defaults.url,
  })
}

Request.prototype.get = function (options) {
  return this.request({
    ...options,
    method: 'get',
    params: options.params || {},
  })
}

Request.prototype.post = function (options) {
  return this.request({
    ...options,
    method: 'post',
    data: options.params || {},
  })
}

module.exports = Request
