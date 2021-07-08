const { proxy } = require('../utils')
const { createAxios } = require('./axios')

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

Request.prototype.get = function ({ url, headers, params }) {
  return this.request({
    method: 'get',
    url,
    headers,
    params: params,
  })
}

Request.prototype.post = function ({ url, headers, params }) {
  return this.request({
    method: 'post',
    url,
    headers,
    data: options.params,
  })
}

module.exports = Request
