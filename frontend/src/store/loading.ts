import { sleep } from '@/helper';
import { count } from 'console';
import { ActionContext } from 'vuex';

interface State {
    loading: number;
}

const state: State = {
    loading: 0,
};

export const loading = {
    namespaced: true,
    state: state,
    getters: {},
    mutations: {
        set(state: State, payload: Object) {
            const keys = Object.keys(payload);
            const stateKeys = Object.keys(state);
            keys.map((key, index) => {
                if (!stateKeys.includes(key)) {
                    console.error('payload is not part of state');
                }
            });
            Object.assign(state, payload);
        },
        addCount(state: State) {
            state.loading += 1;
        },
        minusCount(state: State) {
            state.loading -= 1;
        },
    },
    actions: {
        set(context: ActionContext<any, any>, payload: Object) {
            context.commit('set', payload);
        },
        async load(context: ActionContext<any, any>, fn: any) {
            context.commit('addCount');
            const res = await sleep(fn, 1000);
            context.commit('minusCount');
            return res;
        },
    },
};
