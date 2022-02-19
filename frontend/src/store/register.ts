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
    username: string | null;
    email: string | null;
    password: string | null;
    submitted: false;
}

const state: State = {
    username: null,
    email: null,
    password: null,
    submitted: false,
};

export const register = {
    namespaced: true,
    state: state,
    getters: {
        allErrors(state: State, getters: GetterTree<any, any>) {
            let status = false;
            if (
                getters.usernameError.length > 0 ||
                getters.emailError.length > 0 ||
                getters.passwordError.length > 0
            ) {
                status = true;
            }
            const errors = {
                username: getters.usernameError,
                email: getters.emailError,
                password: getters.passwordError,
                status: status,
            };
            return errors;
        },
        usernameError(state: State, getters: GetterTree<any, any>) {
            const errors: string[] = [];
            const username = state.username;
            if (state.submitted) {
                if (!username) {
                    errors.push('Username is missing');
                } else {
                    if (username.length < 8) {
                        errors.push(`Username must be 8 characters at least`);
                    }
                }
            }
            return errors;
        },
        emailError(state: State, getters: GetterTree<any, any>) {
            const errors: string[] = [];
            const email = state.email;
            if (state.submitted) {
                if (!email) {
                    errors.push('Email is missing');
                } else {
                    if (!validateEmail(email)) {
                        errors.push('Please input valid email');
                    }
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
                } else {
                    if (password.length < 8) {
                        errors.push(`Password must be 8 characters at least`);
                    }
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

        register(context: ActionContext<any, any>) {
            const register = async () => {
                const { username, email, password } = context.state;
                if (username && email && password) {
                    const res = await context.dispatch(
                        'http/request',
                        {
                            method: 'post',
                            url: '/register',
                            data: context.state,
                        },
                        { root: true }
                    );
                    if (res.status == HttpStatusCode.CREATED) {
                        const message = 'Registration success. Please login';
                        router.push({
                            name: 'login',
                            params: { success: message },
                        });
                    } else {
                        let message = '';
                        res.data.errors.forEach((error: string) => {
                            message += `${error} </br>`
                        });
                        router.push({
                            name: 'register',
                            params: { fail: message },
                        });
                    }
                } else {
                    console.error('field is missing');
                }
            };
            context.dispatch('loading/load', register, {
                root: true,
            });
        },
    },
};
