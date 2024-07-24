<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import ModelosApi from "@/api/modelos";
import MarcasApi from "@/api/marcas";
import CategoriasApi from "@/api/categorias";
const modelosApi = new ModelosApi();
const marcasApi = new MarcasApi();
const categoriasApi = new CategoriasApi();
const defaultModelo = { id: null, nome: "", marca: 0, categoria: 0 };
const modelos = ref([]);
const marcas = ref([]);
const categorias = ref([]);

const marca = ref("");

const modelo = reactive({ ...defaultModelo });

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos();
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(modelo, { ...defaultModelo });
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo);
  } else {
    await modelosApi.adicionarModelo(modelo);
  }
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar);
}

async function excluir(id) {
  await modelosApi.excluirModelo(id);
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}
</script>

<template>
  <h1>Modelo</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <input type="text" v-model="modelo.nome" placeholder="Descrição" />
        <select name="marca" v-model="modelo.marca">
          <option v-for="(marca, index) in marcas" :key="index" :value="marca.id">
            {{ marca.nome }}
          </option>
        </select>
        <select name="categoria" v-model="modelo.categoria">
          <option
            v-for="(categoria, index) in categorias"
            :key="index"
            :value="categoria.id"
          >
            {{ categoria.descricao }}
          </option>
        </select>
        <button @click="salvar">
          <i class="mdi mdi-24px mdi-content-save-outline mdi-light" />
        </button>
        <button @click="limpar"><i class="mdi mdi-24px mdi-broom mdi-light"></i></button>
      </div>
      <ul>
        <li v-for="modelo in modelos" :key="modelo.id">
          <span @click="editar(modelo)"> ({{ modelo.id }}) - {{ modelo.nome }} </span>
          <button @click="excluir(modelo.id)">
            <i class="mdi mdi-24px mdi-delete-outline mdi-light"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
