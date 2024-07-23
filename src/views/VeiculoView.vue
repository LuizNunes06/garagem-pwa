<script setup>
import { ref, reactive, onMounted } from "vue";
import VeiculosApi from "@/api/veiculos";
import CoresApi from "@/api/cores";
import ModelosApi from "@/api/modelos";
import AcessoriosApi from "@/api/acessorios";
import { FormButtonsComponent, InputNumber, Select } from "../components/index.js";

const veiculosApi = new VeiculosApi();
const coresApi = new CoresApi();
const modelosApi = new ModelosApi();
const acessoriosApi = new AcessoriosApi();

const expandCheckbox = ref(false);

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
        <Select label="Modelo" :list="modelos" v-model="veiculo.modelo" />
        <span class="input-container">
          <p>Cor:</p>
          <select name="cor" v-model="veiculo.cor">
            <option v-for="(cor, index) in cores" :key="index" :value="cor.id">
              {{ cor.nome }}
            </option>
          </select>
        </span>
        <span class="input-container">
          <p>Acessórios:</p>
          <div :class="!expandCheckbox ? 'checkbox-container' : 'expanded-list'">
            <span class="checkbox-input" v-for="acessorio in acessorios" :key="acessorio">
              <input
                type="checkbox"
                id="checkbox"
                @change="adicionarAcessorio(acessorio.id)"
              />
              <label for="checkbox">{{ acessorio.descricao }} ({{ acessorio.id }})</label>
            </span>
          </div>
          <button @click="expandCheckbox = !expandCheckbox" class="open-checkbox-btn">
            <i
              :class="
                !expandCheckbox
                  ? 'mdi mdi-12px mdi-arrow-down mdi-light'
                  : 'up-arrow-icon mdi mdi-12px mdi-arrow-down mdi-light'
              "
            ></i>
          </button>
        </span>
        <FormButtonsComponent @clear="limpar()" @save="salvar()" />
      </div>
    </div>
    <div class="content-container">
      <ul>
        <li v-for="veiculo in veiculos" :key="veiculo.id">
          <span @click="editar(veiculo)">
            ({{ veiculo.id }}) - {{ veiculo.ano }} - {{ veiculo.preco }}
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
