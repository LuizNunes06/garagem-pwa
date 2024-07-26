<script setup>
import { useAuthStore } from "@/stores/auth";
import { defineProps } from "vue";

defineProps(["show", "func"]);

const authStore = useAuthStore();
</script>

<template>
  <div v-if="show" class="container">
    <div @click="func" class="close-button">
      <i class="mdi mdi-chevron-double-down mdi-24px" />
    </div>
    <router-link @click="func" :to="{ name: 'home' }"
      ><p>Home</p>
      <i class="mdi mdi-home mdi-24px"
    /></router-link>
    <router-link @click="func" to="/categorias"
      ><p>Categorias</p>
      <i class="mdi mdi-list-box mdi-24px"
    /></router-link>
    <router-link @click="func" to="/modelos"
      ><p>Modelos</p>
      <i class="mdi mdi-car-outline mdi-24px"
    /></router-link>
    <router-link @click="func" to="/veiculo"
      ><p>Veiculo</p>
      <i class="mdi mdi-car mdi-24px"
    /></router-link>
    <router-link @click="func" to="/acessorio"
      ><p>Acessório</p>
      <i class="mdi mdi-toolbox mdi-24px"
    /></router-link>
    <router-link @click="func" to="/cor"
      ><p>Cor</p>
      <i class="mdi mdi-format-color-fill mdi-24px"
    /></router-link>
    <router-link @click="func" to="/marca"
      ><p>Marca</p>
      <i class="mdi mdi-registered-trademark mdi-24px"
    /></router-link>
    <div v-if="authStore.loggedIn">
      <router-link @click="func" to="/logout" class="red-text"
        >Logout <i class="mdi mdi-logout mdi-24px red-text"></i
      ></router-link>
    </div>
    <router-link @click="func" v-else to="/login"
      >Login <i class="mdi mdi-login mdi-24px green-text"
    /></router-link>
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
  bottom: 0;
  min-height: auto;
  z-index: 2 !important;
  border-radius: 20px 20px 0 0;
  background-color: #ffffff;
  animation: 1s;

  & .close-button {
    background-color: #e4e4e4;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px 0 0;
    padding: 0.5vh 0;
  }

  & a {
    font-size: 1rem;
    width: 100%;
    border-bottom: 1px solid #c5c5c5;
    padding: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    & .red-text {
      color: rgb(182, 0, 0);
    }

    & .green-text {
      color: green;
    }
  }
}
</style>
