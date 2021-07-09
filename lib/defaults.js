const defaults = {
  // 默认超时时间，单位毫秒
  timeout: 5 * 60 * 1000,

  // 默认请求 url
  url: 'gateway',

  // 重试延迟处理时间
  retryDelay: 300,

  // 请求拦截器 config 处理
  useRequestInterceptor: (config) => config,

  // 请求失败处理函数
  onRequestRejected: (error) => Promise.reject(error),

  // 响应成功处理函数
  onResponseFulfilled: (data) => Promise.resolve(data),

  // 响应失败处理函数
  onResponseRejected: (error) => Promise.reject(error),
}

module.exports = defaults
