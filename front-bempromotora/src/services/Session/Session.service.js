/**
 * @author José Rodrigo
 * @email joserodrigorf@gmail.com
 * @create date 2019-11-04 09:20:03
 * @modify date 2019-11-04 09:20:03
 * @desc Controle de sessão do usuário.
 */

"use strict";

const SESSION_DATA_KEY = "__unisinos_s_f0b0d9caeeac416c7f1a79195a1313c1";
const SESSION_TOKEN_KEY = "__unisinos_s_0b01d74c11d6d2f5c03afc0ce733510e";

export default class SessionService {
  /**
   * Cria uma sessão ativa para o usuário.
   * @param {string} token
   * @param {object} data
   * @param {int} timeExpire
   */
  static create(token, data, timeExpire) {
    if (data != null && data != undefined) {
      localStorage.setItem(SESSION_DATA_KEY, btoa(JSON.stringify(data)));

      if (timeExpire != undefined && timeExpire != null)
        this.addDetail("session_time", timeExpire);
      this.addDetail("expire_at", this._getExpireDate(timeExpire));

      localStorage.setItem(SESSION_TOKEN_KEY, token);
    }
  }

  /**
   * Retorna uma informação especifica dos dados da sessão do usuário.
   * @param {string} detailKey
   * @return {*}
   */
  static getDetail(detailKey) {
    let data = localStorage.getItem(SESSION_DATA_KEY);

    if (data != null && data != undefined) {
      data = JSON.parse(atob(data));

      if (detailKey in data) {
        return data[detailKey];
      }

      return null;
    }

    return null;
  }


  /**
   * Verifica se existe uma sessão ativa no momento.
   * @return {boolean}
   */
  static exists() {
    const data = localStorage.getItem(SESSION_DATA_KEY);
    const key = localStorage.getItem(SESSION_TOKEN_KEY);

    let exists =
      data == null || data == undefined || key == null || key == undefined
        ? false
        : true;

    if (!exists) {
      localStorage.removeItem(SESSION_DATA_KEY);
      localStorage.removeItem(SESSION_TOKEN_KEY);
    } else {
      if (this._verifySessionExpired()) {
        this.destroy(true);
      } else {
        return true;
      }
    }

    return false;
  }

  /**
   * Atualiza o token da sessão.
   * @param {string} token
   */
  static updateToken(token) {
    let data = localStorage.getItem(SESSION_DATA_KEY);

    if (data != null && data != undefined) {
      data = JSON.parse(atob(data));

      if ("expire_at" in data && "session_time" in data) {
        this.updateDetail(
          "expire_at",
          this._getExpireDate(data["session_time"])
        );
      }
    }

    localStorage.setItem(SESSION_TOKEN_KEY, token);
  }

  /**
   * Atualiza uma informação especifica nos dados da sessão do usuário.
   * @param {string} detailKey
   * @param {*} newValue
   */
  static updateDetail(detailKey, newValue) {
    if (this.exists()) {
      let data = localStorage.getItem(SESSION_DATA_KEY);

      if (data != null && data != undefined) {
        data = JSON.parse(atob(data));

        if (detailKey in data) {
          data[detailKey] = newValue;
          localStorage.setItem(SESSION_DATA_KEY, btoa(JSON.stringify(data)));
        }
      }
    }
  }

  /**
   * Adiciona uma nova informação aos dados do usuário da sessão.
   * @param {string} detailKey
   * @param {*} value
   */
  static addDetail(detailKey, value) {
    if (this.exists()) {
      let data = localStorage.getItem(SESSION_DATA_KEY);

      if (data != null && data != undefined) {
        data = JSON.parse(atob(data));

        data[detailKey] = value;
        localStorage.setItem(SESSION_DATA_KEY, btoa(JSON.stringify(data)));
      }
    }
  }

  /**
   * Destroi a sessão ativa.
   * @param {boolean} reload
   */
  static destroy(reload) {
    localStorage.removeItem(SESSION_DATA_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);

    if (reload) {
      window.location.reload();
    }
  }

  /**
   * Verifica se a sessão está expirada.
   * @return {boolean}
   */
  static _verifySessionExpired() {
    const expireAt = this.getDetail("expire_at");

    if (expireAt != null && expireAt != undefined) {
      let baseDate = new Date();
      let actualDate = new Date(
        baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
      );

      return new Date(expireAt) < actualDate;
    }

    return false;
  }

  /**
   * Retorna a data/hora que a sessão irá expirar.
   * @param {int} minutesToExpire
   * @return {string}
   */
  static _getExpireDate(minutesToExpire) {
    let baseDate = new Date();
    let date = new Date(
      baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
    );

    return new Date(date.getTime() + minutesToExpire * 60000).toISOString();
  }
}
