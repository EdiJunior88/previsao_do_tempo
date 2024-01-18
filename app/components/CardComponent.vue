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

const inputTextCity = ref('')
const results = ref<InterfaceIndex | null>(null)
const loading = ref(false)
const errorMessage = ref('')

const fetchAPI = async () => {
  loading.value = true
  results.value = null

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

const background = ref('')
const backgroundCard = ref('')
const textColorCard = ref('')

const backgroundHour = () => {
  const hour = new Date().getHours()

  background.value =
    hour >= 6 && hour <= 12 ? 'bgMorning' : hour > 12 && hour <= 18 ? 'bgAfternoon' : 'bgNight'

  backgroundCard.value =
    hour >= 6 && hour <= 12
      ? 'bg-blue-800/50'
      : hour > 12 && hour <= 18
        ? 'bg-yellow-300/40'
        : 'bg-white/30'

  textColorCard.value =
    hour >= 6 && hour <= 12 ? 'text-white' : hour > 12 && hour <= 18 ? 'text-black' : 'text-white'
}

backgroundHour()

const clearResults = () => {
  results.value = null
  errorMessage.value = ''
  inputTextCity.value = ''
}

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
    class="w-full min-h-screen h-auto flex flex-col justify-center items-center sm:p-12 p-8"
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
          class="rounded-lg p-2 text-black"
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

      <div v-if="loading">Carregando...</div>

      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <ul v-if="results" class="container">
        <div class="flex flex-row flex-wrap justify-center items-center gap-6">
          <SVGComponent :src="IconCity">
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

    <ul
      v-if="results?.forecast"
      :class="[backgroundCard, textColorCard]"
      class="w-full max-w-screen-2xl flex flex-row flex-nowrap justify-start items-center gap-6 overflow-x-auto backdrop-blur-md p-8 rounded-xl"
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
