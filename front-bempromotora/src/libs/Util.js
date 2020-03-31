/**
 * @author José Rodrigo
 * @email joserodrigorf@gmail.com
 * @create date 2020-01-29 12:59:45
 * @modify date 2020-01-29 12:59:45
 * @desc Util helpers.
 */
import { DateTime } from "luxon";
import i18n from '@/plugins/i18n';

export default class Util {

  constructor() {
    i18n.locale = localStorage.getItem("locale");
  }

  static required() {
    return [
      v => !!v || i18n.t("campo_obrigatorio")
    ];
  }

  static validPassword() {
    return [
      v => !!v || i18n.t("senha_obrigatoria"),
      v => !v  || v.length > 7 || i18n.t("erro_senha_tamanho"),
      v => !v  || /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(v) || i18n.t('erro_senha_letras_numeros')
    ];
  }

  static validUsuario() {
    return [
      v => !!v || i18n.t("usuario_obrigatorio")
    ];
  }

  static validCpf() {
    return [
      v => !!v || i18n.t("campo_obrigatorio"),
      v => !v || v.length != 11 || i18n.t("tamanho_cpf"),
      v => !v || this.validaFormatoCpf(v) || i18n.t("cpf_invalido")
    ];

  }

  static validaFormatoCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    var cpf_check = '';

    var result_cpf1 = 0;
    var cpf1 = cpf.slice(0, -2);
    var split_cpf1 = cpf1.split('');
    var base_cpf1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    var i;

    for (i = 0; i < split_cpf1.length; i++) {
      result_cpf1 += split_cpf1[i] * base_cpf1[i];
    }

    var cpf1_digit = 11 - (result_cpf1 % 11);
    cpf_check = cpf1 + cpf1_digit;

    var result_cpf2 = 0;
    var cpf2 = cpf.slice(0, -1);
    var split_cpf2 = cpf2.split('');
    var base_cpf2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    for (i = 0; i < split_cpf2.length; i++) {
      result_cpf2 += split_cpf2[i] * base_cpf2[i];
    }

    var cpf2_digit = 11 - (result_cpf2 % 11);
    cpf_check = cpf2 + cpf2_digit;

    return (cpf_check != cpf) ? false : true;
  }

  static validPassaporte() {
    return [
      v => !v || v.length != 8 || i18n.t("tamanho_passaporte")
    ];
  }

  static validEmail() {
    return [
      v => !!v || i18n.t("email_obrigatorio"),
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || i18n.t('email_invalido')];
  }

  static formatAsMoney(value) {
    if (value == null || value == undefined || value == "") {
      throw new TypeError("Value can't be null, undefined or empty.");
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    return formatter.format(value);
  }

  static currentDate() {
    const date = new Date().toISOString().split("T")[0];

    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    return `${day}/${month}/${year}`;
  }

  static removeDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static formatCNPJ(v) {
    return `${v.substring(0, 2)}-${v.substring(2, 5)}-${v.substring(
      5,
      8
    )}/${v.substring(8, 12)}-${v.substring(12)}`;
  }

  static validFilter(dataIni, dataFim) {

    dataIni = this.formatDatePicker(dataIni);
    dataFim = this.formatDatePicker(dataFim);

    if (new Date(dataIni) < this.removeDays(dataFim, -31)) {
      return { error: true, msg: i18n.t("erro_data_inicial") }
    }

    if (dataFim < dataIni) {

      return { error: true, msg: i18n.t("erro_data_final") }
    }

    return { error: false, msg: '' };
  }

  static formatDatePicker(data) {
    data = DateTime.fromISO(data).setLocale(localStorage.getItem('locale'));
    data = data.toFormat("dd-MM-yyyy");

    if (localStorage.getItem('locale') != 'en') {
      data = data.toString().substring(3, 5) + '-' + data.substring(0, 2) + '-' + data.substring(6, 10);
    }

    return data;
  }

  static formatDataToFilter(dtini, dtfim) {
    var dt_ini_formatada;
    var dt_fim_formatada;

    dtini = this.formatDatePicker(dtini);
    dtfim = this.formatDatePicker(dtfim);

    if (dtini != null) {
      dt_ini_formatada = dtini + ' 00:00:00';
    }

    if (dtfim != null) {
      dt_fim_formatada = dtfim + ' 23:59:59';
    }

    return { dtIni: dt_ini_formatada, dtFim: dt_fim_formatada };
  }

  static formatDate(date) {
    if (!date) return null;
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  static parseDate(date) {
    if (!date) return null;
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  static telefoneMaskara() {
    return "(##) #####-####";
  }

  static dtNascimentoMaskara() {
    return "##/##/####";
  }

  static cpfMaskara() {
    return "###.###.###-##";
  }

  static cepMaskara() {
    return "#####-###";
  }

  static numeroCartaoMascara() {
    return "####-####-####-####";
  }

  static numeroMaskara(){
    return "#############################";
  }

  static validadeMascara() {
    return "##/##";
  }

  static cvvMascara() {
    return "###";
  }

  static calculaTotalTransacoes(transacoes) {
    var total = 0.0;

    transacoes.foreEach((obj) => {
      total += parseFloat(obj.valor);
    });

    return { dthr: '', item: '', forma_pgto: 'SALDO', valor: total.toString() }
  }

  static validaValideCartao(val) {
    var ano_atual = new Date().getFullYear().toString();
    var ano_validade = val != undefined ? '20' + val.substr(val.indexOf('/') + 1) : '';
    if (ano_validade < ano_atual) {
      return true;
    } else {
      return false;
    }
  }

}
