<template>
    <v-app>
        <Appbar :usuarioLogado="false"></Appbar>
        <v-content>
            <br/>
            <v-row justify="center" align-content="center" no-gutters>
                <v-col cols="11" sm="5" md="5" lg="5" xl="5">
                    <v-btn to="/proposta" id="btn-adicionar-conta" @click="showContaDialog=true">{{$t('adicionar_proposta')}}</v-btn>
                    <br/>
                    <br/>
                </v-col>
            </v-row>
            <v-row justify="center" align-content="center" no-gutters>
                <v-col cols="11">
                    <TabelaMinhasPropostas v-if="!showContaDialog"></TabelaMinhasPropostas>
                </v-col>
            </v-row>
            <br/>
            <DialogInformacoes tipo="SUCCESS" :msgInfo="msg" v-model='showDialogInformacoes' ></DialogInformacoes>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import TabelaMinhasPropostas from "@/components/tabelas/TabelaMinhasPropostas";
    import DialogInformacoes from "@/components/dialogs/DialogInformacoes"
    import Appbar from "@/components/Appbar";
    import Footer from "@/components/Footer";
    import CacheService from "../services/Cache/Cache.service";
    export default {
        name: "TabMinhasContas",
        components: {
            TabelaMinhasPropostas,
            DialogInformacoes,
            Appbar,
            Footer
        },
        data: () => ({
            showContaDialog: false,
            showDialogInformacoes: false,
            msg: ''
        }),
        async mounted() {
            if(CacheService.get('proposta-removida')){
                this.showDialogInformacoes =true;
                this.msg = "Proposta removida com sucesso!";
                CacheService.clear();
                return;
            }

            if(CacheService.get('proposta-editada')){
                this.showDialogInformacoes =true;
                this.msg = "Proposta editada com sucesso!";
                CacheService.clear();
                return;
            }

            if(CacheService.get('proposta-adicionada')){
                this.showDialogInformacoes =true;
                this.msg = "Proposta adicionada com sucesso!";
                CacheService.clear();
                return;
            }

            CacheService.clear();
        }
    };
</script>

<style>

    #main-content {
        padding: 0;
    }

    .btn {
        color: white !important;
    }

    #btn-adicionar-conta {
        background-color: green !important;
        color: white !important;
    }

    #texto-limite-contas {
        margin-top: 5px !important;
    }

    #conteudo-tab {
        padding: 0;
        padding-top: 15px;
    }
</style>