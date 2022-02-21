import { createStore } from 'vuex';
import { register } from './register';
import { login } from './login';
import { resetPassword } from './reset-password';
import { http } from './http';
import { loading } from './loading';
import { admin } from './admin';

export const store = createStore({
    modules: {
        register,
        login,
        resetPassword,
        http,
        loading,
        admin,
    },
});
