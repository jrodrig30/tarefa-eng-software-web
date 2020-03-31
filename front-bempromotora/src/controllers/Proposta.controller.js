import SessionService from "../services/Session/Session.service";
import ApiService from "../services/Api/Api.service";
import { ENDPOINTS } from "../libs/constants/Endpoints";

export default class PropostaController extends SessionService {

    static async getPropostas() {
        const result = await ApiService.get(ENDPOINTS.PROPOSTAS);
        console.log(typeof result);
        return result;
    }

    static destroy() {
        return SessionService.destroy();
    }
}