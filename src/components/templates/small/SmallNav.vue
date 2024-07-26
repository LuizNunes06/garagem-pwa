<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link to="/categorias">Categorias</router-link>
    <router-link to="/modelos">Modelos</router-link>
    <router-link to="/veiculo">Veiculo</router-link>
    <router-link to="/acessorio">Acessório</router-link>
    <router-link to="/cor">Cor</router-link>
    <router-link to="/marca">Marca</router-link>
    <div v-if="authStore.loggedIn">
      <router-link to="/logout">Logout</router-link>
      <p>
        Usuário: {{ authStore.user.name ? authStore.user.name : authStore.user.email }}
      </p>
    </div>
    <router-link v-else to="/login">Login</router-link>
  </nav>
</template>

<style scoped>
nav {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -50%;
  background-color: #00bd7e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1vw;

  & a {
    font-size: 1rem;
  }

  & div {
    align-items: center;
    display: flex;
    gap: 1vw;

    & p {
      color: #00bd7e;
    }
  }
}
</style>
