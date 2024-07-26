<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["save"], ['clear']);
</script>

<template>
  <span>
    <button @click="$emit('save')">
      <i class="mdi mdi-24px mdi-content-save-outline mdi-light" />
    </button>
    <button @click="$emit('clear')">
      <i class="mdi mdi-24px mdi-broom mdi-light"></i>
    </button>
  </span>
</template>

<style scoped>
span{
  display: flex;
  gap: 1rem; 
}

@media screen and (max-width: 768px) {
  button{
    width: 100% !important;
  }
}
</style>
