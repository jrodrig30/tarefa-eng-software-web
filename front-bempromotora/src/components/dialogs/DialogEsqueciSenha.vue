<template>
  <v-dialog v-model="isDialogVisible" class="mx-auto" width="380" style="overflow-x:hidden;">
    <v-card>
      <v-card-title style="background-color:#222; color: white" primary-title>
        {{$t("recuperar_senha")}}
        <v-spacer></v-spacer>

        <v-btn text icon color="black" @click="isDialogVisible = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-content style="padding: 15px; padding-top: 0px">
        <v-row no-gutters justify="center" align-content="center">
          <v-col cols="11">
            <br />
            <v-text-field v-model="email" :label="$t('email')" outlined :rules="emailRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align-content="center">
          <v-col cols="11">
            <TermoRecaptcha :termo="''"></TermoRecaptcha>

            <div v-show="visibleAlert">
              <br />
              <Alert :type="typeAlert" :message="messageAlert"></Alert>
            </div>
          </v-col>
        </v-row>
        <br>
      </v-content>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          class="ma-2 font-bold"
          dark
          :loading="carregandoRecaptcha"
          color="indigo darken-4 darken-4"
          @click="enviarEmailRecuperarSenha"
        >{{$t('enviar_email')}}</v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Utils from "@/libs/Util.js";
import Alert from "@/components/Alert";
import i18n from "@/plugins/i18n";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DialogEsqueciSenha",
  props: {
    value: Boolean
  },
  computed: {
    isDialogVisible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  data: () => ({
    email: "",
    carregandoRecaptcha: false,
    emailRules: Utils.validEmail(),
    visibleAlert: false,
    messageAlert: "",
    typeAlert: "error"
  }),
  components: {
    Alert
  },
  async mounted() {
    this.carregandoRecaptcha = true;

    this.carregandoRecaptcha = false;
  },
  methods: {
    ...mapActions(["changeRecaptchaObject"]),
    ...mapGetters(["getRecaptchaObject"]),
    async enviarEmailRecuperarSenha() {
      if (
        this.getRecaptchaObject().recaptcha_ativo == "1" &&
        this.email != ""
      ) {
        if (!this.getRecaptchaObject().hashcaptcha) {
          this.visibleAlert = true;
          this.messageAlert = i18n.t("valida_recaptcha");
          this.typeAlert = "error";

          return;
        } else {
          this.carregandoRecaptcha = true;

          this.carregandoRecaptcha = false;


        }
      }
    }
  }
};
</script>