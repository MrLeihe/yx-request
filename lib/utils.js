// 代理
function proxy(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      return value
    },
  })
}

exports.proxy = proxy
