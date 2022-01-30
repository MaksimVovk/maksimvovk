const sendRequest = require('./send-request')

module.exports = getCurrentWeather

async function getCurrentWeather (body) {
  const currentWeather = await sendRequest(body)

  if (!currentWeather) {
    return
  }

  const { weather, main } = currentWeather
  const temp = Math.round(Number(main.temp))

  const description = weather && Array.isArray(weather) && weather.length
    ? weather[0].description
    : null

  return `${temp}°C ${description ? ', ' + description : ''}`
}