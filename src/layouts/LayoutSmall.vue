<script setup>
import { SmallNav, Header } from "../components/index";
</script>

<template>
  <Header/>
  <main>
    <router-view />
  </main>
  <SmallNav />
</template>

<style scoped></style>
