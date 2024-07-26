<script setup>
import { useAuthStore } from "@/stores/auth";
import { defineProps } from "vue";

defineProps(["show", "func"])

const authStore = useAuthStore();
</script>

<template>
  <div v-if="show" class="container">
    <div @click="func" class="close-button">
        <i class="mdi mdi-chevron-double-down mdi-24px" />
    </div>
    <router-link @click="func" :to="{ name: 'home' }">Home</router-link>
    <router-link @click="func" to="/categorias">Categorias</router-link>
    <router-link @click="func" to="/modelos">Modelos</router-link>
    <router-link @click="func" to="/veiculo">Veiculo</router-link>
    <router-link @click="func" to="/acessorio">Acessório</router-link>
    <router-link @click="func" to="/cor">Cor</router-link>
    <router-link @click="func" to="/marca">Marca</router-link>
    <div v-if="authStore.loggedIn">
      <router-link @click="func" to="/logout">Logout</router-link>
      <p>
        Usuário: {{ authStore.user.name ? authStore.user.name : authStore.user.email }}
      </p>
    </div>
    <router-link @click="func" v-else to="/login">Login</router-link>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: auto;
  z-index: 2 !important;
  background-color: #ffffff ;
  bottom: 0;

  & .close-button{
    background-color: #e4e4e4;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px 0 0;
    padding: .5vh 0;
  }

  & a {
    font-size: 1rem;
    width: 100%;
    border-bottom: 1px solid #c5c5c5;
    padding: 2vh;
  }

  & div {
    align-items: center;
    display: flex;
    gap: 1vw;
    width: 100%;

    & p {
      color: #00bd7e;
      max-width: 50vw;
      min-width: 30vw;
    }
  }
}
</style>
