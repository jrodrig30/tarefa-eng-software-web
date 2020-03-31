<template>
  <v-app-bar
    app
    :color="primary_color"
    max-height="64px"
    elevation="false"
    id="appbar"
    dark
    :class="{'hideAppbar': usuarioLogado}"
    v-bind:style="usuarioLogado ? 'position:relative':'' "
  >
    <img
      :src="imageUrl"
      height="48"
      id="logo"
      :class="{'mostrarLogo': !usuarioLogado}"
      @click="navigateLogin"
      style="cursor:pointer"
    />

    <v-spacer class="spacer-1" :class="{'mostrarLogo': !usuarioLogado}"></v-spacer>


    <div v-if="usuarioLogado" class="my-2 btn-profile">
      <v-btn
        class="ma-2 btn-account"
        small
        outlined
        :color="accent_color"
        @click="navigateDadosPessoa"
      >
        <span>{{this.nameUser.name}}</span>
        <v-icon class="account-icon" :color="accent_color">mdi-account-cog-outline</v-icon>
      </v-btn>
    </div>

    <v-spacer class="spacer-2" :class="{'mostrarLogo': usuarioLogado}"></v-spacer>

    <div class="my-2" id="btn-exit" v-if="usuarioLogado">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon color="white" v-on="on" @click="doLogout()">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </div>
  </v-app-bar>
</template>

<script>
import i18n from "../plugins/i18n";
import RequestsController from "../controllers/Requests.controller";
import SessionService from "../services/Session/Session.service.js";
import { CONSTANTS } from "../libs/constants/Constants";

export default {
  name: "LangButton",
  props: ["usuarioLogado"],

  data: () => ({
    dialog: false,
    primary_color: CONSTANTS.PRIMARY_COLOR,
    accent_color: CONSTANTS.ACCENT_COLOR,
    imageUrl: CONSTANTS.IMAGE_URL,
    nameUser: ""
  }),
  mounted() {
    this.nameUser = SessionService.getDetail("user_info") || [];
  },
  methods: {
    navigateDadosPessoa() {
      this.$router.push("DadosUsuario");
    },
    changeLocale(lang) {
      localStorage.setItem("locale", lang);
      i18n.locale = lang;
    },
    doLogout() {
      RequestsController.destroy();

      this.$router.push("/");
    },
    navigateLogin() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.btn-lingua {
  text-decoration: underline;
  font-size: 13px !important;
}

.btn-lang {
  font-size: 12px !important;
}

.btn-profile {
  padding-left: 15px;
}

.btn-account .account-icon {
  padding-left: 5px;
  font-size: 22px;
}

.spacer-2 {
  display: none;
}

.hideAppbar {
  display: block;
}

@media (max-width: 660px) {
  img {
    height: 28px;
  }

  #btn-exit {
    margin-right: -15px;
  }
}

@media (max-width: 729px) {
  .hideAppbar {
    display: none;
  }
}

@media (max-width: 520px) {
  #logo {
    display: none;
  }

  .btn-lang {
    float: left !important;
  }

  .btn-profile {
    text-align: center;
    padding: 5px;
  }

  .spacer-1 {
    display: none;
  }

  .spacer-2 {
    display: none;
  }

  .btn-profile {
    text-align: center;
  }

  #btn-exit {
    margin-right: -10px;
  }

  .mostrarLogo {
    display: block !important;
  }
}
</style>
