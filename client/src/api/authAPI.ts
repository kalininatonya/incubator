import axios from 'axios';
import {RegisterDataForm} from '../models/forms/registerDataForm';
import {LoginDataForm} from '../models/forms/loginDataForm';
import {RegisterAPI, LoginAPI} from './models/authAPI';

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/api/auth`
});

export const authAPI = {
    async login(formData: LoginDataForm): Promise<LoginAPI> {
        const response = await instance.post<LoginAPI>('/login', formData);
        return response.data;
    },

    async register(formData: RegisterDataForm): Promise<RegisterAPI> {
        const response = await instance.post<RegisterAPI>('/register', formData);
        return response.data;
    }
};
