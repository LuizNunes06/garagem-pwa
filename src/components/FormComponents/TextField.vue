<script setup>
defineProps(["label", "placeholder"]);
const model = defineModel();
</script>
<template>
  <span class="input-container">
    <p>{{ label }}:</p>
    <input type="text" v-model="model" :placeholder="placeholder" />
  </span>
</template>
