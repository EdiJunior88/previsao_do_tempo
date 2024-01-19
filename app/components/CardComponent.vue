<script setup lang="ts">
import apiWeather from '@/api/apiWeather'
import type { InterfaceIndex } from '@/interface/Interface'
import translate from '@/dictionary/Dictionary'
import IconCity from '@/assets/svg/cidade2.svg'
import IconTemperature from '@/assets/svg/temperatura.svg'
import IconCloudCover from '@/assets/svg/cobertura-nuvens.svg'
import IconGustWind from '@/assets/svg/rajada-vento.svg'
import IconThermalSensation from '@/assets/svg/sensacao-termica.svg'
import IconHumidity from '@/assets/svg/umidade.svg'
import IconVisibility from '@/assets/svg/umidade2.svg'
import IconWindSpeed from '@/assets/svg/velocidade-vento.svg'
import IconUV from '@/assets/svg/uv.svg'
import IconClock from '@/assets/svg/relogio.svg'
import LoadingAnimation from '@/assets/svg/animacao-loading.svg'

// inputTextCity é uma variável reativa que armazena uma string vazia.
const inputTextCity = ref('')
// results é uma variável reativa que armazena ou um objeto que implementa a interface
const results = ref<InterfaceIndex | null>(null)
// loading é uma variável reativa que armazena um valor booleano
// indicando se os dados estão sendo carregados no momento.
const loading = ref(false)
// errorMessage é uma variável reativa que armazena uma string vazia.
const errorMessage = ref('')

// Chamada da API através da função fetchAPI
const fetchAPI = async () => {
  // Inicia o loading ("carregamento") como verdadeiro
  // e limpa as respostas anteriores (results).
  loading.value = true
  results.value = null

  // Tenta realizar a busca na API. Caso tenha sucesso,
  // atribui o valor da resposta a variável results.
  // Caso tenha dado erro, atribui uma mensagem de erro personalizada.
  try {
    results.value = await apiWeather(inputTextCity.value)
    inputTextCity.value = ''
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Cidade não encontrada, digite novamente!'
  } finally {
    loading.value = false
  }
}

// Define uma diretiva Vue chamada vFocus que automaticamente coloca o foco
// no elemento ao qual é aplicada quando o elemento é montado (inserido no DOM).
const vFocus = {
  mounted: (el: InterfaceIndex) => el.focus()
}

// Define os valores iniciais das variáveis de estado
// (background, backgroundCard, textColorCard)
const background = ref('')
const backgroundCard = ref('')
const textColorCard = ref('')

// Define o background baseado na hora atual
// (6h a 12h, 12h a 18h, 18h a 6h)
const backgroundHour = () => {
  const hour = new Date().getHours()

  // Se a hora for entre 6h e 12h, o background é 'bgMorning'.
  // Se a hora for entre 12h e 18h, o background é 'bgAfternoon'.
  // Se a hora for entre 18h e 6h, o background é 'bgNight'.
  background.value =
    hour >= 6 && hour <= 12 ? 'bgMorning' : hour > 12 && hour <= 18 ? 'bgAfternoon' : 'bgNight'

  // Se a hora for entre 6h e 12h, o backgroundCard é 'bg-blue-800/50'.
  // Se a hora for entre 12h e 18h, o backgroundCard é 'bg-yellow-300/40'.
  // Se a hora for entre 18h e 6h, o backgroundCard é 'bg-white/30'.
  backgroundCard.value =
    hour >= 6 && hour <= 12
      ? 'bg-blue-800/50'
      : hour > 12 && hour <= 18
        ? 'bg-yellow-300/40'
        : 'bg-white/30'

  // Se a hora for entre 6h e 12h, o textColorCard é 'text-white'.
  // Se a hora for entre 12h e 18h, o textColorCard é 'text-black'.
  // Se a hora for entre 18h e 6h, o textColorCard é 'text-white'.
  textColorCard.value =
    hour >= 6 && hour <= 12 ? 'text-white' : hour > 12 && hour <= 18 ? 'text-black' : 'text-white'
}

// Chama a função backgroundHour()
backgroundHour()

// Quando essa função é chamada, ela define o valor de results como null,
// limpa a mensagem de errorMessage e define o valor de inputTextCity como uma string vazia.
const clearResults = () => {
  results.value = null
  errorMessage.value = ''
  inputTextCity.value = ''
}

// Define a formatação da data e da hora
// A função cria um objeto Date com a string ISO,
// extrai os valores de dia, mês, ano, horas e minutos,
// preenche os valores de um dígito com zeros à esquerda
// e retorna a data e a hora no formato "dd/mm/aaaa hh:mm".
const formatDateAndTime = (isoString: string) => {
  const date = new Date(isoString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}
</script>

<template>
  <div
    :class="background"
    class="w-full min-h-screen h-auto flex flex-col justify-center items-center sm:p-12 p-4"
  >
    <div
      :class="[backgroundCard, textColorCard]"
      class="w-full max-w-screen-2xl flex flex-col items-center justify-center gap-4 backdrop-blur-md p-8 rounded-xl"
    >
      <p class="font-bold font-['system-ui'] text-3xl text-center mb-6">Previsão do Tempo</p>

      <div class="flex flex-col sm:flex-row gap-6 sm:gap-2 mb-6">
        <input
          v-model="inputTextCity"
          v-focus
          type="text"
          placeholder="Busque por uma cidade"
          class="sm:w-72 rounded-lg p-2 text-black"
          @keydown.enter="fetchAPI"
        />

        <div class="flex flex-row justify-center">
          <button
            class="rounded-lg px-4 text-lg transition-transform duration-300 hover:bg-white hover:bg-opacity-50"
            title="Pesquisar"
            @click="fetchAPI"
          >
            🔍
          </button>
          <button
            class="rounded-lg px-4 text-lg transition-transform duration-300 hover:bg-white hover:bg-opacity-50"
            title="Limpar"
            @click="clearResults"
          >
            ❌
          </button>
        </div>
      </div>

      <div v-if="loading" class="-mt-6">
        <img :src="LoadingAnimation" alt="loading animation" />
      </div>

      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <ul v-if="results" class="container">
        <div class="flex flex-row flex-wrap justify-center items-center gap-10">
          <SVGComponent :src="IconCity" class="max-w-52">
            <TextCardComponent text-card="Cidade" :value-card="results.location.name" />
          </SVGComponent>

          <SVGComponent :src="IconTemperature">
            <TextCardComponent
              text-card="Temperatura"
              :value-card="results.current.temp_c.toString()"
              value-measure="ºC"
            />
          </SVGComponent>

          <SVGComponent :src="IconHumidity">
            <TextCardComponent
              text-card="Umidade"
              :value-card="results.current.humidity.toString()"
              value-measure="%"
            />
          </SVGComponent>

          <SVGComponent :src="IconThermalSensation">
            <TextCardComponent
              text-card="Sensação Térmica"
              :value-card="results.current.feelslike_c.toString()"
              value-measure="ºC"
            />
          </SVGComponent>

          <SVGComponent :src="IconCloudCover">
            <TextCardComponent
              text-card="Cobertura Nuvens"
              :value-card="results.current.cloud.toString()"
              value-measure="%"
            />
          </SVGComponent>

          <SVGComponent :src="IconUV">
            <TextCardComponent
              text-card="UV"
              :value-card="results.current.uv.toString()"
              value-measure="/11"
            />
          </SVGComponent>

          <SVGComponent :src="IconVisibility">
            <TextCardComponent
              text-card="Visibilidade"
              :value-card="results.current.vis_km.toString()"
              value-measure="km"
            />
          </SVGComponent>

          <SVGComponent :src="IconGustWind">
            <TextCardComponent
              text-card="Rajada Vento"
              :value-card="results.current.gust_kph.toString()"
              value-measure="km/h"
            />
          </SVGComponent>

          <SVGComponent :src="IconWindSpeed">
            <TextCardComponent
              text-card="Velocidade Vento"
              :value-card="results.current.wind_kph.toString()"
              value-measure="km/h"
            />
          </SVGComponent>
        </div>
      </ul>
    </div>

    <div
      :class="[backgroundCard, textColorCard]"
      class="w-full max-w-screen-2xl backdrop-blur-md rounded-xl"
    >
      <ul
        v-if="results?.forecast"
        class="flex flex-row flex-nowrap justify-start items-center gap-6 p-8 overflow-x-auto"
      >
        <SVGComponent :src="IconClock">
          <p>Horário</p>
        </SVGComponent>
        <div
          v-for="(result, index) in results.forecast.forecastday[0].hour"
          :key="index"
          class="min-w-max flex gap-6 scroll"
        >
          <TextCardForecastComponent
            :hour-day="formatDateAndTime(result.time)"
            :description="translate(result.condition.text)"
            :icon-weather="result.condition.icon"
            :temperature="result.temp_c.toString()"
            value-measure="°C"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bgMorning {
  background-image: url('../assets/img/bgMorning.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bgAfternoon {
  background-image: url('../assets/img/bgAfternoon.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bgNight {
  background-image: url('../assets/img/bgNight.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
