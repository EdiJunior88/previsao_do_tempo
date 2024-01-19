<script setup lang="ts">
// Define as propriedades (props) de um componente Vue.
// Ele especifica os tipos, valores padrão e se as propriedades são obrigatórias ou não.
defineProps({
  textCard: {
    type: String,
    default: '',
    required: true
  },
  valueCard: {
    type: String || Number,
    default: '',
    required: true
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
    <p class="font-normal text-sm text-center">
      {{ textCard }}
    </p>

    <div class="flex flex-row justify-center items-baseline">
      <p class="text-2xl">
        {{ valueCard }}
      </p>
      <p class="text-xs pl-1">
        {{ valueMeasure }}
      </p>
    </div>
  </div>
</template>
