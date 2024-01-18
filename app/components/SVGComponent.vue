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
  <div class="w-28 flex flex-col justify-start items-center text-center">
    <img :src="src" alt="icon city" class="w-7 h-7 mb-2" />
    <slot />
  </div>
</template>

<style lang="css" scoped></style>
