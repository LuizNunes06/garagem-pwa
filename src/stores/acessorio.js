import { ref } from 'vue';
import { defineStore } from 'pinia';

import AcessorioService from '@/services/acessorio';
const acessorioService = new AcessorioService();

export const useAcessorioStore = defineStore('acessorio', () => {
    const acessorios = ref([]);

    async function getAcessorios() {
        acessorios.value = await acessorioService.getAcessorios();
    }

    async function postAcessorio(acessorio) {
        await acessorioService.postAcessorio(acessorio)
    }

    async function putAcessorio(acessorio) {
        await acessorioService.putAcessorio(acessorio);
    }

    async function deleteAcessorio(id) {
        await acessorioService.deleteAcessorio(id)
    }

    return { acessorios, getAcessorios, postAcessorio, putAcessorio, deleteAcessorio };
});
