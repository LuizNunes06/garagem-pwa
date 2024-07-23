<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcasApi from "@/api/marcas";
const marcasApi = new MarcasApi();

const defaultMarca = { id: null, nome: "", nacionalidade: "" };
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcasApi.atualizarMarca(marca);
  } else {
    await marcasApi.adicionarMarca(marca);
  }
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcasApi.excluirMarca(id);
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}
</script>

<template>
  <h1>Marca</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <input type="text" v-model="marca.descricao" placeholder="Descrição" />
        <button @click="salvar">
          <i class="mdi mdi-24px mdi-content-save-outline mdi-light" />
        </button>
        <button @click="limpar"><i class="mdi mdi-24px mdi-broom mdi-light"></i></button>
      </div>

      <ul>
        <li v-for="marca in marcas" :key="marca.id">
          <span @click="editar(marca)">
            ({{ marca.id }}) - {{ marca.nome }} - {{ marca.nacionalidade }}
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
