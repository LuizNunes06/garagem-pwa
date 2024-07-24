<script setup>
defineProps(["list", "edit", "remove"]);
const model = defineModel();
</script>

<template>
  <ul>
    <li v-for="i in list" :key="i.id">
      <span @click="edit(i)"> ({{ i.id }}) - {{ i.descricao }} </span>
      {{ console.log(i) }}
      <button @click="remove(i.id)">
        <i class="mdi mdi-24px mdi-delete-outline mdi-light"></i>
      </button>
    </li>
  </ul>
</template>