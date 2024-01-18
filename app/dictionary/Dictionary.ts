const translationDictionary = {
  Sunny: 'Ensolarado',
  Clear: 'Céu limpo',
  Cloudy: 'Nublado',
  Overcast: 'Nublado',
  Mist: 'Névoa',
  'Patchy rain possible': 'Possibilidade de chuva irregular',
  'Patchy snow possible': 'Possibilidade de neve irregular',
  'Patchy sleet possible': 'Possibilidade de ganizo irregular',
  'Patchy freezing drizzle possible': 'Possibilidade de chuvisco gelado e irregular',
  'Thundery outbreaks possible': 'Possibilidade de trovoada',
  'Blowing snow': 'Caindo neve',
  Blizzard: 'Nevasca',
  Fog: 'Nevoeiro',
  'Freezing fog': 'Névoa congelante',
  'Patchy light drizzle': 'Possibilidade de garoa irregular',
  'Light drizzle': 'Garoa leve',
  'Freezing drizzle': 'Garoa congelante',
  'Heavy freezing drizzle': 'Forte garoa congelante',
  'Patchy light rain': 'Possibilidade de chuva fraca e irregular',
  'light rain': 'Possibilidade de chuva fraca',
  'Moderate rain at times': 'Chuva moderada às vezes',
  'Moderate rain': 'Chuva moderada',
  'Heavy rain': 'Chuva forte',
  'Light freezing rain': 'Chuva leve e congelante',
  'Moderate or heavy freezing rain': 'Chuva congelante moderada ou forte',
  'Light sleet': 'Granizo fraco',
  'Moderate or heavy sleet': 'Granizo moderado ou forte',
  'Patchy light snow': 'Neve fraca ou irregular',
  'Light snow': 'Neve fraca',
  'Patchy moderate snow': 'Neve moderada irregular',
  'Moderate snow': 'Neve moderada',
  'Patchy heavy snow': 'Neve intensa e irregular',
  'Heavy snow': 'Neve forte',
  'Ice pellets': 'Bolinhas de gelo',
  'Light rain shower': 'Chuva leve',
  'Moderate or heavy rain shower': 'Chuva moderada ou forte',
  'Torrential rain shower': 'Chuva torrencial',
  'Light sleet showers': 'Chuva leve com granizo',
  Moder: 'Moderado',
  'Partly cloudy': 'Parcialmente nublado'
}

type translationDictionary = keyof typeof translationDictionary

// Traduz o texto da condição usando o dicionário, se disponível.
// Se não houver tradução, retorna o texto original.
const translate = (conditionText: string) => {
  return translationDictionary[conditionText as translationDictionary] || conditionText
}

export default translate
