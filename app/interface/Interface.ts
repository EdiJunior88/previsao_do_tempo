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
}
