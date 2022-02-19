import { AxiosRequestConfig } from 'axios';

export const repo = '<REPO>';

const baseApiUrl = 'http://localhost:4000/api';

export const axiosConfig: AxiosRequestConfig = {
    baseURL: baseApiUrl
}