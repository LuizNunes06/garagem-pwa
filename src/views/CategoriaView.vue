<script setup>
import { ref, reactive, onMounted } from "vue";
import CategoriasApi from "@/api/categorias";

import { TextField, FormButtonsComponent, DescriptionList } from "@/components";

const categoriasApi = new CategoriasApi();

const defaultCategoria = { id: null, descricao: "" };
const categorias = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await categoriasApi.atualizarCategoria(categoria);
  } else {
    await categoriasApi.adicionarCategoria(categoria);
  }
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await categoriasApi.excluirCategoria(id);
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}
</script>

<template>
  <h1>Categoria</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <TextField
          label="Descrição"
          v-model="categoria.descricao"
          placeholder="Descrição"
        />
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
      <DescriptionList :list="categorias" :edit="editar" :remove="excluir" />
     
    </div>
  </div>
</template>

<style scoped></style>
