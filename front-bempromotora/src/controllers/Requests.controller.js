import SessionService from "../services/Session/Session.service";
import ApiService from "../services/Api/Api.service";
import { ENDPOINTS } from "../libs/constants/Endpoints";

export default class RequestsController extends SessionService {
  static async setProposta(proposta, isEdit = false) {
    const result = isEdit ? await ApiService.put(ENDPOINTS.PROPOSTAS + '/' + proposta._id, proposta) : await ApiService.post(ENDPOINTS.PROPOSTAS, proposta);
    console.log("Resultado: " , result);
    return result.status;
  }

  static async deleteProposta(proposta) {
    const result = await ApiService.delete(ENDPOINTS.PROPOSTAS + '/' + proposta._id, proposta);
    console.log("Delete result: ", result);
    return result.status;
  }

  static async getEstados() {
    const estados = await ApiService.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', true, 1000, false);
    return estados;
  }

  static async getCidades(idestado) {
    const cidades = await ApiService.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + idestado + '/municipios', true, 1000, false);
    return cidades;
  }

  static async getCep(cep) {
    const buscaCep = await ApiService.get('https://viacep.com.br/ws/' + cep + '/json', false);
    return buscaCep;
  }

  static destroy() {
    return SessionService.destroy();
  }
}
