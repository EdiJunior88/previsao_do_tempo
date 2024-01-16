<script setup lang="ts">
import apiWeather from '@/api/apiWeather'
import type { InterfaceIndex } from '@/interface/Interface'

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
    errorMessage.value = 'Cidade não encontrado, digite novamente!'
  } finally {
    loading.value = false
  }
}

// Define uma diretiva Vue chamada vFocus que automaticamente coloca o foco
// no elemento ao qual é aplicada quando o elemento é montado (inserido no DOM).
const vFocus = {
  mounted: (el: InterfaceIndex) => el.focus()
}

const backgroundColor = ref('')

const changeColorBackground = () => {
  const hour = new Date().getHours()

  backgroundColor.value =
    hour >= 6 && hour <= 12 ? 'corDaManha' : hour > 12 && hour <= 18 ? 'corDaTarde' : 'corDaNoite'
}

changeColorBackground()
</script>

<template>
  <div :class="backgroundColor" class="w-full h-screen mx-auto flex justify-center items-center">
    <div class="flex flex-col items-center justify-center gap-4 mb-6">
      <div class="">
        <input
          v-model="inputTextCity"
          v-focus
          type="text"
          placeholder="Digite o nome da cidade"
          @keydown.enter="fetchAPI"
        />
        <button @click="fetchAPI">Buscar</button>
      </div>

      <div v-if="loading">Carregando...</div>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <ul v-if="results" class="grid grid-cols-3 gap-4">
        <p>Cidade: {{ results.location.name }}</p>
        <p>Temperatura: {{ results.current.temp_c }}º</p>
        <p>Umidade: {{ results.current.humidity }}%</p>
        <p>Sensação Térmica: {{ results.current.feelslike_c }}º</p>
        <p>Cobertura Nuvens: {{ results.current.cloud }}%</p>
        <p>UV: {{ results.current.uv }}/11</p>
        <p>Visibilidade: {{ results.current.vis_km }}km</p>
        <p>Rajada Vento: {{ results.current.gust_kph }}km/h</p>
        <p>Velocidade Vento: {{ results.current.wind_kph }}km/h</p>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.corDaManha {
  background-color: #2563eb;
}

.corDaTarde {
  background-color: #d97706;
}

.corDaNoite {
  background-color: #111827;
}
</style>
