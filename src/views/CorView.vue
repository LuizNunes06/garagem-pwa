<script setup>
import { ref, reactive, onMounted } from "vue";
import CoresApi from "@/api/cores";

import { TextField, FormButtonsComponent, NameList } from "@/components";

const coresApi = new CoresApi();

const defaultCor = { id: null, nome: "" };
const cores = ref([]);
const cor = reactive({ ...defaultCor });

onMounted(async () => {
  cores.value = await coresApi.buscarTodasAsCores();
});

function limpar() {
  Object.assign(cor, { ...defaultCor });
}

async function salvar() {
  if (cor.id) {
    await coresApi.atualizarCor(cor);
  } else {
    await coresApi.adicionarCor(cor);
  }
  cores.value = await coresApi.buscarTodasAsCores();
  limpar();
}

function editar(cor_para_editar) {
  Object.assign(cor, cor_para_editar);
}

async function excluir(id) {
  await coresApi.excluirCor(id);
  cores.value = await coresApi.buscarTodasAsCores();
  limpar();
}
</script>

<template>
  <h1>Cor</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <TextField label="Nome" v-model="cor.nome" placeholder="Cor" />
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
      <NameList :list="cores" :edit="editar" :remove="excluir" />
    </div>
  </div>
</template>

<style scoped></style>
