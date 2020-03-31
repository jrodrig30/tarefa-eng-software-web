import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataIni: new Date().toISOString().substring(0, 10),
        dataFim: new Date().toISOString().substring(0, 10),
        checkTermo: false,
        cartaoSelecionado: '',
        recaptchaObject: { site_key_recaptcha: '', recaptcha_ativo: '0' },
        cashlessConfigs: {},
        inicioSessao: '',
        informacoes: {},
        contas: {}
    },
    mutations: {
        changeContas: (state, data) => {
            state.contas = data;
        }, changeInformacoes: (state, data) => {
            state.informacoes = data;
        },
        changeInicioSessao: (state, data) => {
            state.inicioSessao = data;
        },
        changeCheckTermo: (state, data) => {
            state.checkTermo = data;
        },
        changeCashlessConfigs: (state, data) => {
            state.cashlessConfigs = data;
        },
        changeRecaptchaObject: (state, data) => {
            state.recaptchaObject = data;
        },
        changeCartaoSelecionado: (state, data) => {
            state.cartaoSelecionado = data;
        },
        changeDataIni: (state, data) => {
            state.dataIni = data;
        },
        changeDataFim: (state, data) => {
            state.dataFim = data;
        },
    },
    getters: {
        getContas: state => {
            return state.contas;
        }, getInformacoes: state => {
            return state.informacoes;
        },
        getInicioSessao: state => {
            return state.inicioSessao;
        },
        getCheckTermo: state => {
            return state.checkTermo;
        },
        getCashlessConfigs: state => {
            return state.cashlessConfigs;
        },
        getRecaptchaObject: state => {
            return state.recaptchaObject;
        },
        getCartaoSelecionado: state => {
            return state.cartaoSelecionado;
        },
        getDataIni: state => {
            return state.dataIni;
        },
        getDataFim: state => {
            return state.dataFim;
        },
    },
    actions: {
        changeContas: ({ commit }, value) => {
            if (value) {
                commit('changeContas', value);
            }
        }, changeInformacoes: ({ commit }, value) => {
            if (value) {
                commit('changeInformacoes', value);
            }
        },
        changeInicioSessao: ({ commit }, value) => {
            if (value) {
                commit('changeInicioSessao', value);
            }
        },
        changeCheckTermo: ({ commit }, value) => {
            if (value) {
                commit('changeCheckTermo', value);
            }
        },
        changeCashlessConfigs: ({ commit }, value) => {
            if (value) {
                commit("changeCashlessConfigs", value);
            }
        },
        changeRecaptchaObject: ({ commit }, value) => {
            if (value) {
                commit("changeRecaptchaObject", value);
            }
        },
        changeCartaoSelecionado: ({ commit }, value) => {
            if (value) {
                commit("changeCartaoSelecionado", value);
            }
        }, changeDataIni: ({ commit }, value) => {
            if (value) {
                commit("changeDataIni", value);
            }
        },
        changeDataFim: ({ commit }, value) => {
            if (value) {
                commit("changeDataFim", value);
            }
        },
    },
});
