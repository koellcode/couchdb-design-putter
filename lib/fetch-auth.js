const fetch = require('node-fetch')
const basicAuth = require('basic-auth-header')

module.exports = (url, option = {}) => {
  if (!process.env.USER || !process.env.PASSWORD) {
    return fetch(url, option)
  }

  const authHeader = {
    headers: {
      Authorization: basicAuth(process.env.USER, process.env.PASSWORD)
    }
  }
  const authOptions = Object.assign(option, authHeader)
  return fetch(url, authOptions)
}
