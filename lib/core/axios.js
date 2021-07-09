const axios = require('axios').default
const defaults = require('../defaults')

function enhanceError(error) {
  const { status, statusText } = error.response
  return { status, msg: statusText, data: error }
}

module.exports = function createAxios(instanceConfig) {
  let { timeout, useRequestInterceptor, onResponseFulfilled, onResponseRejected } = instanceConfig

  const instance = axios.create({
    timeout,
  })

  instance.interceptors.request.use(
    (config) => {
      return useRequestInterceptor(config)
    },
    (error) => {
      return onRequestRejected(error)
    },
  )

  instance.interceptors.response.use(
    (response) => {
      const { data } = response
      return onResponseFulfilled(data)
    },
    (error) => {
      let config = error.config
      if (!config || !config.retryTimes) return onResponseRejected(enhanceError(error))

      // 重试处理
      const { _retryCount = 0, retryTimes, retryDelay = defaults.retryDelay } = config
      // 在请求对象上添加重试次数
      config._retryCount = _retryCount
      // 达到重试最大次数
      if (_retryCount >= retryTimes) {
        return onResponseRejected(enhanceError(error))
      }
      // 增加请求次数
      config._retryCount++
      // 延迟处理
      const delay = new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, retryDelay)
      })
      // 重新发起请求
      return delay.then(() => {
        return instance(config)
      })
    },
  )

  return instance
}
