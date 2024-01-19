// Uma interface é uma estrutura que define a forma de um objeto.
// Ela especifica quais propriedades ou métodos um objeto deve ter, junto com seus tipos.
// Interface são usadas para definir contratos de forma para objetos,
// garantindo que eles tenham a estrutura esperada.
// Interface são apenas para verificação em tempo de compilação no TypeScript
// e não são incluídas no JavaScript final.
// Podem ser estendidas por outras interfaces para criar uma nova interface
// que herda propriedades de uma ou mais interfaces.
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
