import { baseApiUrl } from '@/config/config';
import HttpStatusCode from '@/helper/http-status-code';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { ActionContext, ActionPayload, MutationPayload } from 'vuex';

interface State {}

const state: State = {};

export const http = {
    namespaced: true,
    state: state,
    mutations: {
        set(state: State, payload: MutationPayload) {
            const keys = Object.keys(payload);
            const stateKeys = Object.keys(state);
            keys.map((key, index) => {
                if (!stateKeys.includes(key)) {
                    console.error('payload is not part of state');
                }
            });
            Object.assign(state, payload);
        },
    },
    actions: {
        set({ commit }: any, payload: ActionPayload) {
            commit('set', payload);
        },

        async request(
            context: ActionContext<any, any>,
            payload: AxiosRequestConfig
        ) {
            const config: AxiosRequestConfig = {
                baseURL: baseApiUrl,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            };
            Object.assign(config, payload);
            try {
                const result = await axios.request(config);
                return result;
            } catch (error) {
                const err = error as AxiosError;
                return(err.response)
            }
        },
    },
};
