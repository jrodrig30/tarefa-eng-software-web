/**
 * @author José Rodrigo
 * @email joserodrigorf@gmail.com
 * @create date 2020-03-30 10:30:28
 * @modify date 2020-03-30 10:30:28
 * @desc Api service.
 */

import Vue from "vue";
import CacheService from "../Cache/Cache.service";

import axios from "axios";
import router from "../../router/index";
import SessionService from "../Session/Session.service";

// const defaultCachedTime = 5;
const $this = Vue;

export default class ApiService extends CacheService {
    static async get(endpoint, setHeaders = true) {
        const requestEndpoint = endpoint;
        try {
            // const dataCached = super.get(requestEndpoint);
            // if (dataCached && !super.isExpired(requestEndpoint)) {
            //     return dataCached;
            // }
            let request = '';
            if (setHeaders) {
                request = await axios.get(requestEndpoint, this.mountHeaders());
            } else {
                request = await axios.get(requestEndpoint);
            }

            if (request && request.data && request.data.error) {
                const error = request.data.error;

                /** No authenticate error. */
                if (error.code == 1) {
                    if (error.message) $this.$toast.error(error.message);
                    SessionService.destroy();

                    return router.push("/");
                }
            }

            this.updateSessionToken(request);
            this.handleRequestError(request);

            // super.set(
            //     requestEndpoint,
            //     request.data,
            //     defaultCachedTime
            // );
            return request.data;
        } catch (error) {

            if (error && error.response) {
                this.handleRequestError(error.response);
            }
        }
    }

    static async post(endpoint, body) {
        const requestEndpoint = endpoint;

        try {
            const request = await axios.post(
                requestEndpoint,
                body,
                this.mountHeaders()
            );

            this.updateSessionToken(request);
            this.handleRequestError(request);
            return request;
        } catch (error) {
            if (error && error.response) {
                this.handleRequestError(error.response);
            }
        }
    }

    static async put(endpoint, body) {
        const requestEndpoint = endpoint;

        try {
            const request = await axios.put(
                requestEndpoint,
                body,
                this.mountHeaders()
            );

            this.updateSessionToken(request);
            this.handleRequestError(request);

            return request.data;
        } catch (error) {
            if (error && error.response) {
                this.handleRequestError(error.response);
            }
        }
    }

    static async delete(endpoint, body) {
        const requestEndpoint = endpoint;

        try {
            const request = await axios.delete(
                requestEndpoint,
                this.mountHeaders(),
                body
            );

            this.updateSessionToken(request);
            this.handleRequestError(request);

            return request;
        } catch (error) {
            if (error && error.response) {
                this.handleRequestError(error.response);
            }
        }
    }

    static updateSessionToken(request) {
        if (request.headers.authorization) {
            return SessionService.updateToken(
                request.headers.authorization.replace("Bearer ", "")
            );
        }
    }

    static handleRequestError(request) {
        if (
            !request.data.result &&
            request.data.error &&
            request.data.error.message
        ) {
            return $this.$toast.error(request.data.error.message);
        }
    }

    static mountHeaders() {
        return {headers: {Authorization: localStorage.getItem('idToken')}};
    }

}
