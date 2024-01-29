// Dicionário de palavras para traduzir do Inglês para o Português
// através dos dados da API
const translationDictionary = {
  Sunny: 'Ensolarado',
  'Sunny ': 'Ensolarado',
  Clear: 'Céu limpo',
  'Clear ': 'Céu limpo',
  'Partly Cloudy': 'Parcialmente nublado',
  'Partly Cloudy ': 'Parcialmente nublado',
  Cloudy: 'Nublado',
  'Cloudy ': 'Nublado',
  Overcast: 'Nublado',
  'Overcast ': 'Nublado',
  Mist: 'Névoa',
  'Mist ': 'Névoa',
  'Patchy rain possible': 'Possibilidade de chuva irregular',
  'Patchy rain nearby': 'Chuva irregular',
  'Patchy snow possible': 'Possibilidade de neve irregular',
  'Patchy sleet possible': 'Possibilidade de ganizo irregular',
  'Patchy freezing drizzle possible': 'Possibilidade de chuvisco gelado e irregular',
  'Thundery outbreaks possible': 'Possibilidade de trovoada',
  'Blowing snow': 'Caindo neve',
  Blizzard: 'Nevasca',
  'Blizzard ': 'Nevasca',
  Fog: 'Nevoeiro',
  'Fog ': 'Nevoeiro',
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
  'Moder ': 'Moderado',
  'Moderate or heavy sleet showers': 'Chuvas de granizo moderadas ou fortes',
  'Light snow showers': 'Nevascas leves',
  'Moderate or heavy snow showers': 'Chuvas de neve moderadas ou fortes',
  'Light showers of ice pellets': 'Chuvas leves de bolinhas de gelo',
  'Moderate or heavy showers of ice pellets': 'Chuvas moderadas ou fortes de bolinhas de gelo',
  'Patchy light rain with thunder': 'Chuva fraca e irregular com trovões',
  'Moderate or heavy rain with thunder': 'Chuva moderada ou fraca com trovões',
  'Patchy light snow with thunder': 'Neve fraca ou moderada com trovões',
  'Moderate or heavy snow with thunder': 'Neve moderada ou forte com trovões'
}

// Define um tipo que representa as chaves do objeto translationDictionary
type translationDictionary = keyof typeof translationDictionary

// Traduz o texto da condição usando o dicionário, se disponível.
// Se não houver tradução, retorna o texto original.
const translate = (conditionText: translationDictionary): string => {
  return translationDictionary[conditionText] || conditionText
}

export default translate
