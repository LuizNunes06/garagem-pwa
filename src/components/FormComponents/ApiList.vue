<script setup>
defineProps(["list", "edit", "remove"]);
</script>

<template>
  <ul>
    <li v-for="i in list" :key="i.id">
      <span @click="edit(i)"> ({{ i.id }}) - {{ i?.nome? i?.nome: i?.descricao }} </span>
      <button @click="remove(i.id)">
        <i class="mdi mdi-24px mdi-delete-outline mdi-light"></i>
      </button>
    </li>
  </ul>
</template>