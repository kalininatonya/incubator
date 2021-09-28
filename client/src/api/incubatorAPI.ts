import axios from 'axios';
import {registerInterceptors} from './interceptors/interceptors';
import {BirdDataForm} from '../models/forms/birdDataForm';
import {IncubatorAPI} from './models/incubatorAPI';
import {MessageAPI} from './models/messageAPI';

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/api`
});
//Регистрируем интерсепторы-мидлвара которая добавляет токен авторизации в headers
//Функция которая вызывается при каждом запросе
registerInterceptors(instance);

export const incubatorAPI = {
    async getIncubator(incubatorId: number): Promise<IncubatorAPI> {
        const response = await instance.get<IncubatorAPI>(`/incubator/${incubatorId}`);
        return response.data;
    },

    async listIncubators(): Promise<IncubatorAPI[]> {
        const response = await instance.get<IncubatorAPI[]>('/incubator');
        return response.data;
    },
    
    async addIncubator(formData: BirdDataForm): Promise<IncubatorAPI> {
        const response = await instance.post<IncubatorAPI>('/incubator/add', formData);
        return response.data;
    },

    async editIncubator(formData: BirdDataForm, incubatorId: number): Promise<IncubatorAPI> {
        const response = await instance.put<IncubatorAPI>(`/incubator/edit/${incubatorId}`, formData);
        return response.data;
    },

    async deleteIncubator(incubatorId: number): Promise<MessageAPI> {
        const response = await instance.delete<MessageAPI>(`/incubator/delete/${incubatorId}`);
        return response.data;
    },
};