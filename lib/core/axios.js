const axios = require('axios').default

function createAxios(config) {
  const http = axios.create({
    timeout: config.timeout,
  })

  http.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  http.interceptors.response.use(
    (response) => {
      console.log('response=====', response.status)
      // return config.responseHandle(response)
      return response
    },
    (error) => {
      console.log('error=====', error.config)
      const { status, statusText } = error.response
      return Promise.reject({ status, msg: statusText })
    },
  )

  return http
}

exports.createAxios = createAxios
