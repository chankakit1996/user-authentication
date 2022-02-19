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
    newPassword: string | null;
    submitted: false;
}

const state: State = {
    email: null,
    newPassword: null,
    submitted: false,
};

export const resetPassword = {
    namespaced: true,
    state: state,
    getters: {
        allErrors(state: State, getters: GetterTree<any, any>) {
            let status = false;
            if (
                getters.emailError.length > 0 ||
                getters.newPasswordError.length > 0
            ) {
                status = true;
            }
            const errors = {
                email: getters.emailError,
                newPassword: getters.newPasswordError,
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
                } else {
                    if (!validateEmail(email)) {
                        errors.push('Please input valid email');
                    }
                }
            }
            return errors;
        },
        newPasswordError(state: State, getters: GetterTree<any, any>) {
            const errors: string[] = [];
            const newPassword = state.newPassword;
            if (state.submitted) {
                if (!newPassword) {
                    errors.push('Password is missing');
                } else {
                    if (newPassword.length < 8) {
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

        resetPassword(context: ActionContext<any, any>) {
            const resetPassword = async () => {
                const { email, newPassword } = context.state;
                if (email && newPassword) {
                    const res = await context.dispatch(
                        'http/request',
                        {
                            method: 'post',
                            url: '/reset-password',
                            data: context.state,
                        },
                        { root: true }
                    );
                    if (res.status == HttpStatusCode.OK) {
                        router.push({
                            name: 'login',
                            params: {
                                success: res.data.message
                            }
                        });
                    } else {
                        let message = '';
                        res.data.errors.forEach((error: string) => {
                            message += `${error} </br>`;
                        });
                        router.push({
                            name: 'reset-password',
                            params: { fail: message },
                        });
                    }
                } else {
                    console.error('field is missing');
                }
            };

            context.dispatch('loading/load', resetPassword, {
                root: true,
            });
        },
    },
};
