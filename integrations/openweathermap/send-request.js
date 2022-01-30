const axios = require('axios')
const res = require('express/lib/response')
const url = require('url')

const URL = 'http://api.openweathermap.org/data/2.5/weather'

module.exports = sendRequest

async function sendRequest (body) {
  return await axios.get(URL, {
    params: body,
  })
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    throw new Error(`openweathermap: error while sending request.  ${error}`)
  })
}
