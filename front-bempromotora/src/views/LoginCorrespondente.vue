<template>
    <v-app id="LoginCorrespondente">
        <Appbar :usuarioLogado="false"></Appbar>
        <v-content class="main-content">
            <v-row justify="center" align-content="center" no-gutters>
                <v-col cols="10" md="4" sm="6">
                    <v-container class="container-login" style="margin-top:0px;">
                        <v-row>
                            <v-col cols="12">
                                <h3>{{ $t('titulo_login_correspondente') }}</h3>
                            </v-col>
                        </v-row>

                        <v-form ref="form" v-model="isValidForm">
                            <v-text-field
                                    v-model="credentials.email"
                                    :label="$t('email')"
                                    outlined
                                    :rules="emailRules"
                                    style="margin-top:10px;"
                                    v-on:keyup.enter="authenticate"
                            ></v-text-field>

                            <v-text-field
                                    v-model="credentials.password"
                                    :label="$t('senha')"
                                    :rules="passwordRules"
                                    outlined
                                    type="password"
                                    v-on:keyup.enter="authenticate"
                            ></v-text-field>

                            <v-row>
                                <v-col cols="6">
                                    <v-btn
                                            :color="secondaryColor"
                                            class="mr-4 btn-entrar"
                                            @click="navigateToSignup"
                                            :loading="isLoading"
                                            :disabled="!isValidForm"
                                            block
                                    >{{ $t("logar") }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn
                                            color="#f0f0f0"
                                            class="mr-4"
                                            @click="navigateToSignup"
                                    >{{ $t("btn_cadastrar") }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <br/>
                        <v-row justify="center" align-content="center">
                            <v-col cols="6">

                                <v-btn
                                        color="#f0f0f0"
                                        class="mr-4"
                                        block
                                        @click="signIn"
                                >
                                    <v-img
                                            class="mr-1"
                                            max-width="30px"
                                            src="img/icons/google.svg"
                                    />
                                    Login Google
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-content>

        <DialogRecuperarSenha v-if="dialogRecupearSenha" v-model="dialogRecupearSenha"></DialogRecuperarSenha>

        <Footer></Footer>
    </v-app>
</template>

<script>
    import Appbar from "../components/Appbar";
    import Footer from "../components/Footer";
    import {CONSTANTS} from "@/libs/constants/Constants";
    import i18n from "../plugins/i18n";
    import RequestsController from "../controllers/Requests.controller.js";
    import Validations from "../libs/Util.js";
    import DialogRecuperarSenha from "@/components/dialogs/DialogEsqueciSenha";
    import CacheService from "../services/Cache/Cache.service";
    import SessionService from "../services/Session/Session.service";
    import Vue from "vue";
   var obj;
    export default {
        name: "LoginCorrespondente",
        components: {
            Appbar,
            Footer,
            DialogRecuperarSenha,

        },
        data: () => ({
            credentials: {},
            isLoading: false,
            isValidForm: false,
            dialogRecupearSenha: false,
            secondaryColor: CONSTANTS.SECONDARY_COLOR,
            passwordRules: Validations.validPassword(),
            emailRules: Validations.validEmail()
        }),
        async mounted() {
            RequestsController.destroy();
            SessionService.destroy(false);
            CacheService.clear();
        },
        methods: {
            navigateToSignup() {
                alert("Por favor faça o login pelo Google! Recurso desabilitado no momento!");
            },
            async authenticate() {
                var ref = this;
                if (ref.isLoading) {
                    return;
                }

                if (this.$refs.form.validate()) {
                    ref.isLoading = true;

                    const authUser = await RequestsController.authenticate(this.credentials);

                    if (authUser) {
                        this.$toast.success(i18n.t("toast_login_sucesso"));
                        this.$router.push("Home");
                    } else {
                        this.isLoading = false;
                    }
                }
            },
            signIn() {
               obj = this;
                Vue.googleAuth().directAccess();
                Vue.googleAuth().signIn(function(googleUser){
                    console.log("GoogleUser: ", googleUser.uc);
                        localStorage.setItem('idToken', googleUser.uc.id_token)
                        obj.$router.push('/listar-propostas');
                }, function (error) {
                    alert(error);
                });
            }
        }
    };
</script>

<style scoped>
    .v-btn {
        cursor: pointer;
    }

    #btn-esqueci-senha {
        text-decoration: underline;
    }

    h3 {
        font-size: 26px;
        margin-bottom: 15px;
    }

    .btn-entrar {
        color: white !important;
    }

    .col-input:first-child {
        padding-bottom: 0px;
    }

    .container-login {
        background-color: white;
        height: auto;
        padding: 15px 10px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        position: relative;
        z-index: 10;
    }

    .btn-esqueci-senha {
        text-decoration: underline;
        font-size: 11px !important;
    }

    .main-content {
        background-color: #e44604;
        background-size: 100% 100%;
        justify-content: center;
        align-items: center;
    }

    .col-input {
        margin-bottom: 0;
        padding-bottom: 0;
    }

    @media (max-width: 980px) {
        .main-content {
            margin-top: 0px;
        }
    }

    @media (max-width: 630px) {
        h3 {
            font-size: 20px;
        }

        .main-content {
            background-size: 100% 100%;
            justify-content: center;
            align-items: center;
            margin-top: 100px;
        }

    }
</style>

<style>
    body,
    html {
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>