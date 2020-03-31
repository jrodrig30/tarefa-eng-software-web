<template>
  <div>
    <v-data-table
      :headers="dataTableHeaders"
      :items.sync="propostas"
      :items-per-page="50"
      item-key="name"
      class="tabelaContas"
      :loading="isLoading"
      :mobile-breakpoint="NaN"
      :no-data-text="$t('nenhuma_proposta')"
      disable-sort
      hide-default-footer
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <td v-for="(header, index) in props.headers" :key="header.text">
            <span :class="{'alinharEsquerda': index==1}">{{header.text}}</span>
          </td>
        </tr>
      </template>

      <template v-slot:item="props">
        <tr>
          <td class="coluna">{{props.item.nome}}</td>
          <td class="coluna">{{props.item.cpf}}</td>
          <td class="coluna">{{props.item.convenio}}</td>
          <td class="coluna">{{props.item.celular}}</td>
          <td class="coluna">{{props.item.status}}</td>
          <td class="coluna">{{new Date(props.item.dataAdd).toLocaleString()}}</td>
          <td>
            <v-btn text @click="editarProposta(props.item)">
              <v-icon color="black">mdi-square-edit-outline</v-icon>
            </v-btn>
          </td>

          <td>
            <v-btn text @click="removerProposta(props.item)">
              <v-icon color="black">mdi-close-circle-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-bottom-sheet v-model="bottomSheet" persistent inset>
        <v-sheet class="text-center" height="200px">
          <v-spacer></v-spacer>
          <p class="py-3" style="font-size:20px; ">{{textoBottomSheet}}</p>
          <v-btn class="mt-6 btn-sim" @click="confirmaAlteracaoStatusConta(true)">{{$t("btn_sim")}}</v-btn>
          <v-btn class="mt-6 btn-nao" @click="confirmaAlteracaoStatusConta(false)">{{$t("btn_nao")}}</v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </div>


    <DialogInformacoes tipo="SUCCESS" :msgInfo="msg" v-model='showDialogInformacoes' ></DialogInformacoes>
    <DialogInformacoes tipo="ERROR" :msgInfo="msgErro" v-model='showDialogInformacoesErro' ></DialogInformacoes>
  </div>
</template>
<script>
import DialogInformacoes from "@/components/dialogs/DialogInformacoes";
import PropostaController from "@/controllers/Proposta.controller.js";
import CacheService from "@/services/Cache/Cache.service";
import Requests from "@/controllers/Requests.controller.js";
import i18n from "@/plugins/i18n.js";

export default {
  name: "TabelaMinhasContas",
  components: { DialogInformacoes},
  data: () => ({
    isLoading: false,
    bottomSheet: false,
    textoBottomSheet: "",
    resultadoBottomSheet: false,
    showDialogInformacoes:false,
    showDialogInformacoesErro:false,
    msg: '',
    msgErro: '',
    showContaDialog: false,
    statusConta: "",
    idconta: "",
    editarConta: [],
    propostas: [],
    trad_conta_ativa: i18n.t("conta_ativa"),
    dataTableHeaders: [
      { text: i18n.t("nome"), value: "nome" },
      { text: i18n.t("cpf"), value: "cpf" },
      { text: i18n.t("convenio"), value: "convenio" },
      { text: i18n.t("celular"), value: "celular" },
      { text: i18n.t("status"), value: "status" },
      { text: i18n.t("data_add"), value: "dataAdd" },
      { text: "editar", value: "Editar" },
      { text: "remover", value: "Remover" },
    ]
  }),
  async mounted() {
    this.isLoading=true;
    this.propostas = await PropostaController.getPropostas();
    console.log("Propostas: " ,  this.propostas);
    this.isLoading=false;
  },
  watch: {

  },
  methods: {
    editarProposta(proposta) {
      CacheService.set('editar-proposta', proposta);
      this.$router.push('/proposta');
    },
    async removerProposta(proposta) {
      this.editarProposta = proposta;
      const responseCode = await Requests.deleteProposta(proposta);
      if (responseCode == 200 || responseCode == 204) {
        this.msg = "Proposta removida!";
        this.showDialogInformacoes = true;
        this.$router.go(0);
      } else {
        this.msgErro = "A Proposta não pode ser removida!";
        this.showDialogInformacoesErro = true;
      }

      this.loadingBotao = false;
    },
    async confirmaAlteracaoStatusProposta(confirm) {
      if (confirm) {
        this.bottomSheet = false;
        var msg =
          this.statusConta == "Ativa"
            ? i18n.t("conta_desativada")
            : i18n.t("conta_ativada");

        this.$toast.success(msg);

      } else {
        this.bottomSheet = false;
      }
    },
    showConfirmDialog() {
      if (this.statusConta === "Ativa") {
        this.textoBottomSheet = i18n.t("confirmar_desativacao_conta");
      } else {
        this.textoBottomSheet = i18n.t("confirmar_ativacao_conta");
      }

      this.bottomSheet = true;
    }
  }
};
</script>


<style>
.tabelaContas .v-data-table-header th:nth-child(2),
.tabelaContas .v-data-table-header th:nth-child(3),
.tabelaContas .v-data-table-header th:nth-child(4),
.tabelaContas .v-data-table-header th:nth-child(5),
.tabelaContas .v-data-table-header th:nth-child(6),
.tabelaContas .v-data-table-header th:nth-child(7),
.tabelaContas .v-data-table-header th:nth-child(8),
.tabelaContas tbody tr td:nth-child(2),
.tabelaContas tbody tr td:nth-child(3),
.tabelaContas tbody tr td:nth-child(4),
.tabelaContas tbody tr td:nth-child(5),
.tabelaContas tbody tr td:nth-child(6),
.tabelaContas tbody tr td:nth-child(7) {
  text-align: left !important;
}

.tabelaContas tbody tr td {
  font-weight: 400;
  font-size: 13px;
}

.tabelaContas .v-data-table-header th:nth-child(4),
.tabelaContas tbody tr td:nth-child(4) {
  text-align: left !important;
}

.tabelaContas .v-data-table-header th:nth-child(1),
.tabelaContas tbody tr td:nth-child(1) {
  text-align: left !important;
}

.tabelaContas tbody .v-data-table__empty-wrapper td:nth-child(1) {
  text-align: center !important;
}

.alinharDireita {
  text-align: right !important;
}

.tabelaContas {
  border: 1px solid rgb(211, 211, 211);
}

.tabelaContas .v-data-table-header {
  background-color: rgb(236, 236, 236) !important;
}

.tabelaContas .v-data-table-header th {
  text-align: center !important;
  color: #333 !important;
  font-size: 14px !important;
  text-transform: uppercase;
}

.coluna {
  text-align: center !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}

.v-data-table__empty-wrapper {
  color: #333 !important;
}

.v-application--wrap {
  height: 220px !important;
}

@media (max-width: 1200px) {
}

@media (max-width: 800px) {
  .tabelaContas .v-data-table-header th {
    font-size: 13px !important;
  }
}

@media (max-width: 620px) {
  .v-data-table-header-mobile label {
    max-width: 100% !important;
    font-size: 13px !important;
  }
}
</style>

<style scoped>
.btn-sim {
  background-color: rgb(14, 107, 12) !important;
  color: white !important;
  margin-right: 5px !important;
}

.btn-nao {
  background-color: rgb(206, 14, 14) !important;
  color: white !important;
  margin-left: 5px !important;
}
</style>