<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { LinksBar } from "@/components";
const authStore = useAuthStore();

const showSide = ref(false)

function ShowLinks(){
  showSide.value = !showSide.value
}
</script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }"><i class="mdi mdi-home mdi-24px" /></router-link>
    <router-link to="/veiculo"><i class="mdi mdi-car mdi-24px" /> </router-link>
    <i @click="ShowLinks" class="mdi mdi-dots-horizontal mdi-24px" />
  </nav>
  <LinksBar :show="showSide" :func="ShowLinks" />
</template>

<style scoped>
nav {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0 !important;
  width: auto;
  gap: 2rem;
  z-index: 1 !important;
  filter: drop-shadow(0px 15px 8px #cacaca);

  & i {
    filter: brightness(0);
  }

  & a {
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
