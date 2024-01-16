<script setup lang="ts">
import apiWeather from '@/api/apiWeather'
import type { InterfaceIndex } from '@/interface/Interface'

const weather = ref('')
const results = ref<InterfaceIndex | null>(null)
const loading = ref(false)
const error = ref<InterfaceIndex | null>(null)

const fetchAddress = async () => {
  loading.value = true
  error.value = null
  try {
    results.value = await apiWeather(weather.value)
    console.log(results.value)
  } catch (err) {
    error.value = err as any
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <input v-model="weather" type="text" placeholder="Digite o endereço" />
    <button @click="fetchAddress">Buscar</button>
    <div v-if="loading">Carregando...</div>
    <div v-if="error">Um erro ocorreu: {{ error.message }}</div>
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
