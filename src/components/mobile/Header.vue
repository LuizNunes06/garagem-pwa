<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <router-link to="/">
      <img src="../../assets/logo.png" alt="" />
    </router-link>

    <div v-if="authStore.loggedIn">
      <router-link @click="func" to="/logout">
        <i class="mdi mdi-logout mdi-24px red-text"
      /></router-link>
      <p>
        Usuário: {{ authStore.user.name ? authStore.user.name : authStore.user.email }}
      </p>
    </div>
    <router-link @click="func" v-else to="/login"
      ><i class="mdi mdi-login mdi-24px green-text" />Login</router-link
    >
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid #0000002f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 2vw;

  & img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .red-text {
    color: rgb(182, 0, 0);
  }

  & .green-text {
    color: green;
  }
}
</style>
