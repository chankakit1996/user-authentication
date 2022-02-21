import { baseApiUrl } from '@/config/config';
import HttpStatusCode from '@/helper/http-status-code';
import { validateEmail } from '@/helper/validations';
import router from '@/router';
import axios from 'axios';
import {
    ActionContext,
    ActionPayload,
    GetterTree,
    MutationPayload,
} from 'vuex';

interface State {
    email: string | null;
    password: string | null;
    submitted: false;
}

const state: State = {
    email: null,
    password: null,
    submitted: false,
};

export const login = {
    namespaced: true,
    state: state,
    getters: {
        allErrors(state: State, getters: GetterTree<any, any>) {
            let status = false;
            if (
                getters.emailError.length > 0 ||
                getters.passwordError.length > 0
            ) {
                status = true;
            }
            const errors = {
                email: getters.emailError,
                password: getters.passwordError,
                status: status,
            };
            return errors;
        },
        emailError(state: State, getters: GetterTree<any, any>) {
            const errors: string[] = [];
            const email = state.email;
            if (state.submitted) {
                if (!email) {
                    errors.push('Email is missing');
                }
            }
            return errors;
        },
        passwordError(state: State, getters: GetterTree<any, any>) {
            const errors: string[] = [];
            const password = state.password;
            if (state.submitted) {
                if (!password) {
                    errors.push('Password is missing');
                }
            }
            return errors;
        },
    },
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

        async login(context: ActionContext<any, any>) {
            const login = async () => {
                const { email, password } = context.state;
                if (email && password) {
                    const res = await context.dispatch(
                        'http/request',
                        {
                            method: 'post',
                            url: '/login',
                            data: context.state,
                        },
                        { root: true }
                    );
                    if (res.status == HttpStatusCode.OK && res.data.token) {
                        const token = res.data.token;
                        localStorage.setItem('token', token);

                        router.push({
                            name: 'admin'
                        });
                    } else {
                        let message = '';
                        res.data.errors.forEach((error: string) => {
                            message += `${error} </br>`
                        });
                        router.push({
                            name: 'login',
                            params: { fail: message },
                        });
                    }
                } else {
                    console.error('field is missing');
                }
            };
            context.dispatch('loading/load', login, { root: true });
        },
    },
};
