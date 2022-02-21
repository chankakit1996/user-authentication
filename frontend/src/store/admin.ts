import HttpStatusCode from '@/helper/http-status-code';
import { Action, ActionContext } from 'vuex';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import router from '@/router';

interface State {
    users: User[];
}

const state: State = {
    users: [],
};
const apiUrl = {
    getUsers: '/get-users',
    logout: '/logout',
    logoutAll: '/logout-all',
};

export interface User {
    email: string;
    jwt: {
        token: string;
        _id: string;
    }[];
    password: string;
    username: string;
    __v: number;
    _id: string;
    icon?: string;
}

export const admin = {
    namespaced: true,
    state: state,
    getters: {},
    mutations: {
        set(state: State, payload: any) {
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
        set(context: ActionContext<any, any>, payload: any): void {
            context.commit('set', payload);
        },
        getUsers(context: ActionContext<any, any>) {
            const getUsers = async () => {
                const res = await context.dispatch(
                    'http/request',
                    {
                        method: 'get',
                        url: apiUrl.getUsers,
                    },
                    { root: true }
                );
                console.log(res);
                if (res.status == HttpStatusCode.OK) {
                    if (res.data.users) {
                        const { users } = res.data as {
                            users: User[];
                        };
                        users.forEach((user) => {
                            const icon = createAvatar(style, {
                                seed: user.username,
                                dataUri: true,
                                radius: 50,
                                backgroundColor: '#182550',
                            });
                            user.icon = icon;
                        });
                        return users;
                    }
                }
            };
            return context.dispatch('loading/load', getUsers, {
                root: true,
            });
        },
        logout(context: ActionContext<any, any>) {
            const logout = async () => {
                const res = await context.dispatch(
                    'http/request',
                    {
                        method: 'get',
                        url: apiUrl.logout,
                    },
                    { root: true }
                );
                if (res.status == HttpStatusCode.OK) {
                    router.push({
                        name: 'login',
                        params: {
                            success: res.data.message,
                        },
                    });
                } else {
                    let message = '';
                    res.data.errors.forEach((error: string) => {
                        message += `${error} </br>`;
                    });
                    router.push({
                        name: 'admin',
                        params: { fail: message },
                    });
                }
            };
            context.dispatch('loading/load', logout, {
                root: true,
            });
        },
        logoutAll(context: ActionContext<any, any>) {
            const logoutAll = async () => {
                const res = await context.dispatch(
                    'http/request',
                    {
                        method: 'get',
                        url: apiUrl.logout,
                    },
                    { root: true }
                );
                if (res.status == HttpStatusCode.OK) {
                    router.push({
                        name: 'login',
                        params: {
                            success: res.data.message,
                        },
                    });
                } else {
                    let message = '';
                    res.data.errors.forEach((error: string) => {
                        message += `${error} </br>`;
                    });
                    router.push({
                        name: 'admin',
                        params: { fail: message },
                    });
                }
            };
            context.dispatch('loading/load', logoutAll, {
                root: true,
            });
        },
    },
};
