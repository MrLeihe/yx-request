const axios = require('axios').default

function createAxios(config) {
  const instance = axios.create({
    timeout: config.timeout,
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      console.log('response=====', response.data)
      if (response.status !== 200) {
        return
      }
      return response.data
    },
    (error) => {
      console.log('error=====', error)
      return Promise.reject(error)
    }
  )

  return instance
}

exports.createAxios = createAxios
