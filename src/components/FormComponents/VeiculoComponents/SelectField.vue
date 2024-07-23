<script setup>
defineProps(["label", "list"]);
const model = defineModel();
</script>
<template>
  <span class="input-container">
    <p>{{ label }}</p>
    <select v-model="model">
      <option v-for="i in list" :key="i" :value="i.id">
        {{ i.nome }}
      </option>
    </select>
  </span>
</template>
