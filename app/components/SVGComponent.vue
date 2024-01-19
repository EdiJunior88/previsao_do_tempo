<script setup lang="ts">
// Define as propriedades (props) de um componente Vue.
// Ele especifica os tipos, valores padrão e se as propriedades são obrigatórias ou não.
defineProps({
  src: {
    type: String,
    default: '',
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col justify-start items-center text-center">
    <img :src="src" alt="icon city" class="w-7 h-7 mb-2" />
    <slot />
  </div>
</template>
