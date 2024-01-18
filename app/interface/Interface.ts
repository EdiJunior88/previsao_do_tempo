export interface InterfaceForecastHour {
  time: string
  temp_c: number
  condition: {
    text: string
    icon: string
  }
}

export interface InterfaceForecastDay {
  date: String
  day: {
    maxtemp_c: number
  }
  hour?: InterfaceForecastHour[]
}

export interface InterfaceIndex {
  value: string
  address: string
  message: string
  el: HTMLElement
  focus: () => void
  current: {
    temp_c: number
    last_updated: string
    humidity: number
    cloud: number
    uv: number
    vis_km: number
    wind_kph: number
    feelslike_c: number
    gust_kph: number
  }
  location: {
    name: string
  }
  forecast: {
    forecastday: InterfaceForecastDay[]
  }
}
