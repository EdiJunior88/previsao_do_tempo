<script setup lang="ts">
defineProps({
  hourDay: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
    required: false
  },
  iconWeather: {
    type: String,
    default: '',
    required: false
  },
  temperature: {
    type: String,
    default: '',
    required: false
  },
  valueMeasure: {
    type: String,
    default: '',
    required: false
  }
})
</script>

<template>
  <div>
    <p class="font-normal text-sm text-center">{{ hourDay }}</p>

    <div class="flex flex-col justify-center items-center text-center gap-2">
      <p>{{ description }}</p>
      <img :src="iconWeather" alt="icon weather" />
    </div>

    <div class="flex flex-row justify-center items-baseline">
      <p>{{ temperature }}</p>
      <p class="text-xs pl-1">{{ valueMeasure }}</p>
    </div>
  </div>
</template>
