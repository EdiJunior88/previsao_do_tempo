import axios from 'axios'
const apiWeather = async (value: string) => {
  const config = useRuntimeConfig()
  const apiKey = config.NUXT_API_KEY
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&days=1&aqi=yes`
  )
  return response.data
}

export default apiWeather
