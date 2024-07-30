<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorios";
import { TextField, FormButtonsComponent, ApiList } from "@/components";

import { useAcessorioStore } from "@/stores/acessorio";
const acessorioStore = useAcessorioStore();
async function getAcessorios() {
  await acessorioStore.getAcessorios();
  console.log(acessorioStore)
}

const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  await getAcessorios();
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
        <TextField
          label="Descrição"
          v-model="acessorio.descricao"
          placeholder="Descrição"
        />
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
      <ApiList :list="acessorioStore.acessorios" :edit="acessorioStore.putAcessorio" :remove="acessorioStore.deleteAcessorio" />
    </div>
  </div>
</template>

<style scoped></style>
