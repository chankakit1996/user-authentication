import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { repo } from './src/config/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: process.env.NODE_ENV === 'production' ? `/${repo}/` : './',
    build: {
        minify: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            public: path.resolve(__dirname, './public'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/style/_animations.scss";
                @import "@/style/_variables.scss";
                @import "@/style/_mixins.scss";
              `,
            },
        },
    },
});
