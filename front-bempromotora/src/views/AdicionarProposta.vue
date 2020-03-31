<template>
    <v-app id="CadastroProposta">
        <Appbar :usuarioLogado="false"></Appbar>
        <v-content>
            <div v-if="!proposta"><h4>{{$t('titulo_cadastro_proposta')}}</h4></div>

            <v-row justify="center" align-content="center">
                <v-col cols="10" sm="2" md="3" lg="3" xl="3">
                    <v-btn text id="btn-voltar" color="red" @click="navigateLogin">{{$t('voltar')}}</v-btn>
                </v-col>
                <v-col cols="10" sm="8" md="6" lg="5" xl="6">
                    <v-form ref="form" v-model="validForm" lazy-validation>
                        <v-text-field
                                v-model="credentials.nome"
                                :label="$t('nome')+'*'"
                                outlined
                                :rules="nomeRules"
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.email"
                                :label="$t('email')+'*'"
                                outlined
                                :rules="emailRules"
                                type="email"
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.cpf"
                                :label="$t('cpf')+'*'"
                                v-mask="cpfMaskara"
                                outlined
                                :rules="cpfRules"
                                :disabled="disableCpf"
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.data_nascimento"
                                :label="$t('data_nascimento')+'*'"
                                outlined
                                :rules="dtNascimentoRules"
                                v-mask="dtNascimentoMaskara"
                        ></v-text-field>

                        <v-select
                                v-model="credentials.convenio"
                                :items="[{dsc: $t('INSS Dataprev'), value:2}, {dsc:$t('SIAPE'), value:3}, {dsc: $t('Outro'), value:4}]"
                                :label="$t('convenio')"
                                item-text="dsc"
                                item-value="dsc"
                                required
                                outlined
                        >
                            <template slot="item" slot-scope="data">
                                <span v-html="data.item.dsc"></span>
                            </template>
                        </v-select>

                        <v-select
                                v-model="credentials.sexo"
                                :items="[{dsc: $t('masculino'), value:2}, {dsc:$t('feminino'), value:3}, {dsc: $t('sexo_outro'), value:4}]"
                                :label="$t('sexo')"
                                item-text="dsc"
                                item-value="dsc"
                                required
                                outlined
                        >
                            <template slot="item" slot-scope="data">
                                <span v-html="data.item.dsc"></span>
                            </template>
                        </v-select>


                        <v-text-field
                                v-model="credentials.celular"
                                :label="$t('celular')+'*'"
                                return-masked-value
                                outlined
                                :rules="celularRules"
                                v-mask="telefoneMaskara"
                        ></v-text-field>
                        <v-file-input
                                v-model="credentials.documento"
                                color="deep-purple accent-4"
                                counter
                                label="Documento"
                                multiple
                                placeholder="Faça o upload do documento"
                                prepend-icon="mdi-paperclip"
                                outlined
                                :show-size="1000"
                        >
                            <template v-slot:selection="{ index, text }">
                                <v-chip
                                        v-if="index < 2"
                                        color="deep-purple accent-4"
                                        dark
                                        label
                                        small>
                                    {{ text }}
                                </v-chip>

                                <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2">
                                    +{{ documento.length - 2 }} Documento(s)
                                </span>
                            </template>
                        </v-file-input>


                        <v-container v-if="escondeEndereco" style="padding:0">
                            <h4>{{$t('dados_endereco')}}</h4>
                            <v-divider></v-divider>
                            <v-text-field
                                    v-model="credentials.cep"
                                    label="CEP*"
                                    return-masked-value
                                    outlined
                                    :rules="requiredRule"
                                    v-mask="cepMaskara"
                                    v-on:blur="buscaCep"
                            ></v-text-field>

                            <v-text-field
                                    v-model="credentials.logradouro"
                                    :label="$t('logradouro')+'*'"
                                    return-masked-value
                                    outlined
                                    :rules="requiredRule"
                                    :loading="loadingCepFields"
                            ></v-text-field>

                            <v-text-field
                                    v-model="credentials.numero"
                                    :label="$t('numero')+'*'"
                                    return-masked-value
                                    outlined
                                    :rules="requiredRule"
                                    v-mask="numeroMaskara"
                                    :loading="loadingCepFields"
                            ></v-text-field>

                            <v-text-field
                                    v-model="credentials.bairro"
                                    :label="$t('bairro')+'*'"
                                    return-masked-value
                                    outlined
                                    :rules="requiredRule"
                                    :loading="loadingCepFields"
                            ></v-text-field>

                            <v-text-field
                                    v-model="credentials.complemento"
                                    :label="$t('complemento')"
                                    return-masked-value
                                    outlined
                                    :loading="loadingCepFields"
                            ></v-text-field>

                            <v-select
                                    v-model="credentials.estado"
                                    :items="estados"
                                    :label="$t('estado')+'*'"
                                    item-text="nome"
                                    item-value="id"
                                    :rules="requiredRule"
                                    outlined
                                    :loading="loadingCepFields"
                                    v-on:change="buscaCidades"
                            >
                                <template slot="item" slot-scope="data">
                                    <span v-html="data.item.nome"></span>
                                </template>
                            </v-select>

                            <v-select
                                    v-model="credentials.cidade"
                                    :items="cidades"
                                    :label="$t('cidade')+'*'"
                                    item-text="nome"
                                    item-value="id"
                                    :rules="requiredRule"
                                    outlined
                                    :loading="loadingCidades || loadingCepFields"
                            >
                                <template slot="item" slot-scope="data">
                                    <span v-html="data.item.nome"></span>
                                </template>
                            </v-select>
                        </v-container>


                        <Alert type="error" v-if="visibleAlert" :message="messageAlert"></Alert>

                        <br/>

                        <v-btn
                                block
                                x-large
                                :color="secondary_color"
                                id="btn-finalizar"
                                :disabled="!validForm"
                                :loading="loadingBotao"
                                @click="cadastraProposta"
                        >{{$t("finalizar_cadastro")}}
                        </v-btn>
                        <br/>
                        <br/>
                        <br/>
                    </v-form>
                </v-col>
                <v-col cols="10" sm="2" md="3" lg="3" xl="3"></v-col>
            </v-row>
        </v-content>

        <Footer></Footer>
    </v-app>
</template>

<script>
    import Appbar from "@/components/Appbar";
    import Footer from "@/components/Footer";
    import Validations from "../libs/Util.js";
    import Requests from "../controllers/Requests.controller.js";
    import {CONSTANTS} from "../libs/constants/Constants";
    import Alert from "@/components/Alert";
    import {mapActions, mapGetters} from "vuex";
    import CacheService from "../services/Cache/Cache.service";

    export default {
        name: "CadastroProposta",
        components: {
            Appbar,
            Footer,
            Alert
        },
        data: () => ({
            credentials: {cidade: {}, estado: {}},
            estados: [],
            cidades: [],
            proposta: {},
            validForm: false,
            show1: false,
            show2: false,
            secondary_color: CONSTANTS.SECONDARY_COLOR,
            emailRules: Validations.validEmail(),
            requiredRule: Validations.required(),
            nomeRules: Validations.required(),
            cpfRules: Validations.validCpf(),
            passaporteRules: Validations.validPassaporte(),
            dtNascimentoRules: Validations.required(),
            celularRules: Validations.required(),
            telefoneMaskara: Validations.telefoneMaskara(),
            dtNascimentoMaskara: Validations.dtNascimentoMaskara(),
            cpfMaskara: Validations.cpfMaskara(),
            cepMaskara: Validations.cepMaskara(),
            numeroMaskara: Validations.numeroMaskara(),
            disableCpf: false,
            loadingCepFields: false,
            loadingEstados: false,
            loadingCidades: false,
            escondeEndereco: true,
            loadingBotao: false,
            showRecaptcha: false,
            errorPassword: false,
            siteKey: "0",
            visibleAlert: false,
            messageAlert: "",
            files: [],

        }),

        async mounted() {
            this.buscaEstados();
            this.proposta = CacheService.get('editar-proposta');
            if (this.proposta) {
                this.credentials.nome = this.proposta.nome;
                this.credentials.email = this.proposta.email;
                this.credentials.cpf = this.proposta.cpf;
                this.credentials.data_nascimento = this.proposta.dataNascimento;
                this.credentials.convenio = this.proposta.convenio;
                this.credentials.sexo = this.proposta.sexo;
                this.credentials.celular = this.proposta.celular;
                this.credentials.documento = this.proposta.documento;
                this.credentials.cep = this.proposta.cep;
                this.credentials.logradouro = this.proposta.logradouro;
                this.credentials.numero = this.proposta.numero;
                this.credentials.bairro = this.proposta.bairro;
                this.credentials.complemento = this.proposta.complemento;
                let element = document.getElementById('');
                element.dispatchEvent(new Event('change', { 'bubbles': true }))
            }
        },
        methods: {
            ...mapActions([""]),
            ...mapGetters(["getRecaptchaObject"]),
            async buscaEstados() {
                this.loadingEstados = true;
                this.estados = await Requests.getEstados();
                this.loadingEstados = false;
            },
            async buscaCidades() {
                this.loadingCidades = true;
                this.cidades = await Requests.getCidades(this.credentials.estado.id);
                this.loadingCidades = false;
            },
            navigateLogin() {
                this.$router.push("/");
            },
            async buscaCep() {
                if (this.credentials.cep == undefined) {
                    return;
                }

                this.credentials.cep = this.credentials.cep.replace("-", "");
                if (this.credentials.cep != "" && this.credentials.cep.length == 8) {
                    this.loadingCepFields = true;

                    var resultado = await Requests.getCep(this.credentials.cep);

                    if (resultado.logradouro && resultado.bairro && resultado.uf) {
                        await this.populaCepFields(resultado);
                    }

                    this.loadingCepFields = false;
                }
            },
            async populaCepFields(resultado) {
                this.credentials.logradouro = resultado.logradouro;
                this.credentials.bairro = resultado.bairro;

                await this.buscaEstados();
                this.credentials.estado = this.estados.find(
                    element => element.sigla == resultado.uf
                );


                console.log("credenciais: ", this.credentials.estado);
                await this.buscaCidades();
                this.credentials.cidade = this.cidades.find(element =>
                    element.nome.includes(resultado.localidade)
                );
            },
            async cadastraProposta() {

                if (this.$refs.form.validate()) {
                    this.loadingBotao = true;

                    var propostaFinal = {
                        "nome": this.credentials.nome,
                        "email": this.credentials.email,
                        "cpf": this.credentials.cpf,
                        "dataNascimento": this.credentials.data_nascimento,
                        "sexo": this.credentials.sexo,
                        "convenio": this.credentials.convenio,
                        "celular": this.credentials.celular,
                        "documento": this.credentials.documento[0].name,
                        "cep": this.credentials.cep,
                        "logradouro":
                            this.credentials.logradouro == undefined
                                ? ""
                                : this.credentials.logradouro,
                        "numero": this.credentials.numero,
                        "bairro": this.credentials.bairro,
                        "complemento":
                            this.credentials.complemento == undefined
                                ? ""
                                : this.credentials.complemento,
                        "estado": this.credentials.estado.sigla,
                        "estado_id": this.credentials.estado.id,
                        "cidade": this.credentials.cidade.nome,
                        "cidade_id": this.credentials.cidade.id,
                        "responsavelId": "12345"
                    };

                    console.log("Proposta: ", propostaFinal)
                    var isEdit =  this.proposta != false ;
                    if(isEdit){
                            propostaFinal._id = this.proposta._id;
                    }

                    const responseCode = await Requests.setProposta(propostaFinal, isEdit);
                    console.log("code: ", responseCode);
                    if (responseCode == 200 || responseCode == 201 || responseCode.constructor === String) {
                        var chave = isEdit? "proposta-editada" : "proposta-adicionada";
                        CacheService.set(chave, true);
                        this.$router.push('/listar-propostas');
                    }


                    this.loadingBotao = false;
                }
            }
        }
    };
</script>

<style>
    .v-input--checkbox .v-input__slot {
        width: auto !important;
        margin: auto !important;
    }
</style>

<style scoped>
    #CadastroProposta {
        padding-top: 64px;
    }

    p {
        padding: 35px;
        padding-bottom: 0;
        font-size: 26px;
    }

    #btn-voltar {
        text-decoration: underline;
        margin-top: 10px;
    }

    #btn-finalizar {
        color: white;
    }

    h4 {
        text-transform: uppercase;
        font-size: 20px;
        margin-top: 15px;
    }

    .v-divider {
        margin-bottom: 25px;
    }

    .hideRecaptcha {
        display: none;
    }
</style>