import axios from "axios";

export default class AcessorioService {
  async getAcessorios() {
    const response = await axios.get("/acessorios/");
    return response.data.results;
  }
  async postAcessorio(acessorio) {
    const response = await axios.post("/acessorios/", acessorio);
    return response.data.results;
  }
  async putAcessorio(acessorio) {
    const response = await axios.put(`/acessorios/${acessorio.id}/`, acessorio);
    return response.data.results;
  }
  async deleteAcessorio(id) {
    const response = await axios.delete(`/acessorios/${id}/`);
    return response.data.results;
  }
}
