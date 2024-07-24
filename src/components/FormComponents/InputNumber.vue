<script setup>
defineProps(["label", "step"]);
const model = defineModel();

</script>
<template>
  <span class="input-container">
    <p>{{ label }}:</p>
    <input type="number" :step="step" v-model="model" />
  </span>
</template>
