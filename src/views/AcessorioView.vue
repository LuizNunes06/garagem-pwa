<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorios";
const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessoriosApi.atualizarAcessorio(acessorio);
  } else {
    await acessoriosApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessoriosApi.excluirAcessorio(id);
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}
</script>

<template>
  <h1>Acessorio</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <input type="text" v-model="acessorio.descricao" placeholder="Descrição" />
        <button @click="salvar">
          <i class="mdi mdi-24px mdi-content-save-outline mdi-light" />
        </button>
        <button @click="limpar"><i class="mdi mdi-24px mdi-broom mdi-light"></i></button>
      </div>
      <ul>
        <li v-for="acessorio in acessorios" :key="acessorio.id">
          <span @click="editar(acessorio)">
            ({{ acessorio.id }}) - {{ acessorio.descricao }}
          </span>
          <button @click="excluir(categoria.id)">
            <i class="mdi mdi-24px mdi-delete-outline mdi-light"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
