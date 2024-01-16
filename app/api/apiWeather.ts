import axios from 'axios'

const apiWeather = async (value: string) => {
  try {
    const config = useRuntimeConfig()
    const apiKey = config.public.NUXT_API_KEY
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&days=1&aqi=yes`
    )
    return response.data
    console.log('API GEO', response.data)
  } catch (error) {
    return error
  }
}

export default apiWeather
