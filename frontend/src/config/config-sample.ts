// Copy below to config.ts as your config file

import { AxiosRequestConfig } from 'axios';

export const repo = '<REPO>'; // /<repo>/

export let baseApiUrl = 'http://localhost:4000/api';
if (process.env.NODE_ENV === 'production') {
    baseApiUrl = '';
} else {
    baseApiUrl = 'http://localhost:4000/api';
}

export const axiosConfig: AxiosRequestConfig = {
    baseURL: baseApiUrl,
};
