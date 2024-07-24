<script setup>
import { ref, reactive, onMounted } from "vue";
import VeiculosApi from "@/api/veiculos";
import CoresApi from "@/api/cores";
import ModelosApi from "@/api/modelos";
import AcessoriosApi from "@/api/acessorios";
import {
  FormButtonsComponent,
  InputNumber,
  SelectField,
  CheckBoxField,
  VehicleList,
} from "../components/index.js";

const veiculosApi = new VeiculosApi();
const coresApi = new CoresApi();
const modelosApi = new ModelosApi();
const acessoriosApi = new AcessoriosApi();

const cores = ref([]);
const veiculos = ref([]);
const modelos = ref([]);
const acessorios = ref([]);
const defaultVeiculo = {
  id: null,
  ano: 0,
  preco: 0,
  modelo: 0,
  cor: 0,
  acessorios: [],
};

const veiculo = reactive({ ...defaultVeiculo });

onMounted(async () => {
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  cores.value = await coresApi.buscarTodasAsCores();
  modelos.value = await modelosApi.buscarTodosOsModelos();
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});
function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo });
}

async function salvar() {
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo);
  } else {
    await veiculosApi.adicionarVeiculo(veiculo);
  }
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}

function editar(veiculo_para_editar) {
  Object.assign(veiculo, veiculo_para_editar);
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id);
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}

function adicionarAcessorio(id) {
  const i = veiculo.acessorios.indexOf(id);
  if (veiculo.acessorios.includes(id)) {
    veiculo.acessorios.splice(i, 1);
  } else {
    veiculo.acessorios.push(id);
  }
}
</script>

<template>
  <h1>Veiculo</h1>
  <div class="main-container">
    <div class="content-container">
      <div class="form">
        <InputNumber label="Ano" v-model="veiculo.ano" />
        <InputNumber label="Preço" step="0.1" v-model="veiculo.preco" />
        <SelectField label="Modelo" :list="modelos" v-model="veiculo.modelo" />
        <SelectField label="Cor" :list="cores" v-model="veiculo.cor" />
        <CheckBoxField
          label="Acessórios"
          :list="acessorios"
          :func="adicionarAcessorio"
          v-model="veiculo.acessorios"
        />
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
      <VehicleList :list="veiculos" :edit="editar" :remove="excluir" />
    </div>
  </div>
</template>

<style scoped></style>
