const http = require('../lib/request')

function useRequestInterceptor(config) {
  config.headers['x-token'] = 'stone'
  return config
}

function onResponseFulfilled(data) {
  if (data.status !== 0) {
    return Promise.reject(data)
  }
  return Promise.resolve(data)
}

function onResponseRejected(error) {
  return Promise.reject(error)
}

const api = http.create({
  timeout: 5 * 1000,
  useRequestInterceptor,
  onResponseFulfilled,
  onResponseRejected,
})

api
  .get({
    url: 'http://127.0.0.1:3000/',
    params: {
      // userId: '100787',
    },
    retryTimes: 0,
    retryDelay: 1000,
    // retryTimes: 2,
  })
  .then((res) => {
    console.log(res, res.status)
  })
  .catch((e) => {
    console.error('catch====', e.data.config)
  })

api._axios.get('http://127.0.0.1:3000/').then((res) => {
  console.log('native====', res)
})
