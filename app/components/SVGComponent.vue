<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
    required: true
  }
})
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <img :src="src" alt="icon city" class="w-7 h-7 mb-2" />
    <slot />
  </div>
</template>

<style lang="css" scoped></style>
