<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import ModelosApi from "@/api/modelos";
import MarcasApi from "@/api/marcas";
import CategoriasApi from "@/api/categorias";
import { TextField, SelectField, FormButtonsComponent, NameList } from "@/components";

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
        <TextField label="Nome" v-model="modelo.nome" placeholder="Nome" />
        <SelectField label="Marca" :list="marcas" v-model="modelo.marca" />
        <SelectField label="Categoria" :list="categorias" v-model="modelo.categoria" />
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
      <NameList :list="modelos" :edit="editar" :remove="excluir" />
    </div>
  </div>
</template>

<style scoped></style>
