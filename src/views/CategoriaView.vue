<script setup>
import { ref, reactive, onMounted } from "vue";
import CategoriasApi from "@/api/categorias";
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
        <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
        <button @click="salvar">
          <i class="mdi mdi-24px mdi-content-save-outline mdi-light" />
        </button>
        <button @click="limpar"><i class="mdi mdi-24px mdi-broom mdi-light"></i></button>
      </div>
      <ul>
        <li v-for="categoria in categorias" :key="categoria.id">
          <span @click="editar(categoria)">
            ({{ categoria.id }}) - {{ categoria.descricao }}
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
