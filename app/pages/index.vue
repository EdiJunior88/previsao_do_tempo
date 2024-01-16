<script setup lang="ts">
import apiWeather from '@/api/apiWeather'
import type { InterfaceIndex } from '@/interface/Interface'

const weather = ref('')
const results = ref<InterfaceIndex | null>(null)
const loading = ref(false)
const errorMessage = ref('')

const fetchAPI = async () => {
  loading.value = true
  try {
    results.value = await apiWeather(weather.value)
    console.log(results.value)
  } catch (error) {
    errorMessage.value = 'Estado ou Cidade não encontrado, digite novamente!'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <input v-model="weather" type="text" placeholder="Estado ou Cidade" />
    <button @click="fetchAPI">Buscar</button>
    <div v-if="loading">Carregando...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <ul v-if="results">
      <p>Cidade: {{ results.location.name }}</p>
      <p>Temperatura Atual: {{ results.current.temp_c }}º</p>
      <p>Umidade: {{ results.current.humidity }}%</p>
      <p>Cobertura de Nuvens: {{ results.current.cloud }}%</p>
      <p>UV: {{ results.current.uv }}/11</p>
      <p>Visibilidade: {{ results.current.vis_km }}km</p>
      <p>Vento: {{ results.current.wind_kph }}km/h</p>
    </ul>
  </div>
</template>

<style lang="css" scoped></style>
