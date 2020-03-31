/**
 * @author José Rodrigo
 * @email joserodrigorf@gmail.com
 * @create date 2019-11-04 10:54:52
 * @modify date 2019-11-04 10:54:52
 * @desc Controle de cache.
 */

"use strict";

const CACHE_NAME_KEY = "__unisinos_c_2df2a4ade2936ea5639c79d631a51a08"; // Chave única para identificar o cache no Storage.

export default class CacheService {
  /**
   * Insere um valor no cache.
   * @param cacheKey - Chave do objeto a ser guardado no cache.
   * @param value - Valor a ser inserido no cache.
   * @param timeToExpire - Tempo em minutos para expirar do cache, caso não seja passado nenhum valor o cache nunca irá expirar.
   * @return {void}
   */
  static set(cacheKey, value, timeToExpire) {
    let cacheObject = this._getCacheObject();

    timeToExpire = timeToExpire != null ? this._getExpireDate(timeToExpire) : 0;

    let initialInsertObject = [
      { key: cacheKey, data: value, expireWhen: timeToExpire }
    ];

    let insertObject = { key: cacheKey, data: value, expireWhen: timeToExpire };

    if (cacheObject == null) {
      localStorage.setItem(CACHE_NAME_KEY, this.toJSON(initialInsertObject));
    } else {
      cacheObject = this.parse(cacheObject);

      let findObject = false;

      for (let k = 0; k < cacheObject.length; k++) {
        if (cacheObject[k].key == cacheKey) {
          cacheObject[k] = insertObject;

          findObject = true;
        }
      }

      if (!findObject) {
        cacheObject.push(insertObject);
      }

      localStorage.setItem(CACHE_NAME_KEY, this.toJSON(cacheObject));
    }

    return true;
  }

  /**
   * Retorna um objeto do cache.
   * @param cacheKey - Chave do item no cache.
   * @return {object | boolean}
   */
  static get(cacheKey) {
    let cacheObject = this._getCacheObject();

    if (cacheObject == null || cacheObject == undefined) return false;

    cacheObject = this.parse(cacheObject);

    for (let k = 0; k < cacheObject.length; k++) {
      this.verifyExpiredKeys(cacheObject[k].key);

      if (cacheObject[k].key == cacheKey) {
        return cacheObject[k].data;
      }
    }

    return false;
  }



  /**
   * Verifica se a chave informada do cache está expirada.
   * @param cacheKey
   * @return {boolean}
   */
  static isExpired(cacheKey) {
    let cacheObject = this._getCacheObject();

    if (cacheObject == null || cacheObject == undefined) return true;

    cacheObject = this.parse(cacheObject);

    let baseDate = new Date();
    let actualDate = new Date(
      baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
    );

    for (let k = 0; k < cacheObject.length; k++) {
      if (cacheObject[k].key == cacheKey) {
        if (cacheObject[k].expireWhen == 0) return false;

        if (new Date(cacheObject[k].expireWhen) > actualDate) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Remove uma chave e seu objeto do cache.
   * @param cacheKey
   * @return {boolean}
   */
  static removeKey(cacheKey) {
    let cacheObject = this._getCacheObject();

    if (cacheObject == null || cacheObject == undefined) return false;

    cacheObject = this.parse(cacheObject);

    for (let k = 0; k < cacheObject.length; k++) {
      if (cacheObject[k].key == cacheKey) {
        cacheObject.splice(k, 1);
      }
    }

    localStorage.setItem(CACHE_NAME_KEY, this.toJSON(cacheObject));

    return true;
  }

  static verifyExpiredKeys(cacheKey) {
    if (this.isExpired(cacheKey)) {
      this.removeKey(cacheKey);
    }
  }

  /**
   * Remove todas as chaves e objetos do cache.
   */
  static clear() {
    localStorage.removeItem(CACHE_NAME_KEY);
  }

  static _getExpireDate(minutesToExpire) {
    let baseDate = new Date();
    let date = new Date(
      baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
    );

    return new Date(date.getTime() + minutesToExpire * 60000).toISOString();
  }

  static _getCacheObject() {
    return localStorage.getItem(CACHE_NAME_KEY);
  }

  /**
   * Retorna um valor JSON formatado.
   * @param {String} value
   * @return {Object}
   */
  static parse(value) {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  }

  /**
   * Insere um valor no formato JSON.
   * @param {*} value
   */
  static toJSON(value) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
  }
}
