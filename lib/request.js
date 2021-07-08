const Request = require('./core/Request')
const defaults = require('./defaults')
const mergeConfig = require('./core/mergeConfig')

/**
 * 创建一个 Request 的实例
 *
 * @param {Object} defaultConfig 创建请求实例的配置
 */
function createInstance(defaultConfig) {
  return new Request(defaultConfig)
}

// 创建一个用于导出的默认实例
var request = createInstance(defaults)

request.create = function create(instanceConfig) {
  return createInstance(mergeConfig(request.defaults, instanceConfig))
}

module.exports = request
module.exports.default = request
