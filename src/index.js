const axios = require('axios')

const instance = axios.create({
  timeout: 5 * 60 * 1000,
})
