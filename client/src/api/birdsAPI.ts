import axios from 'axios';
import {registerInterceptors} from './interceptors/interceptors';
import {BirdsAPI} from './models/birdsAPI';

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/api`
});
//Регистрируем интерсепторы-мидлвара которая добавляет токен авторизации в headers
registerInterceptors(instance);

//Получаем список птиц из справочника
export const birdsAPI = {
    async listBirds(): Promise<BirdsAPI[]> {
        const response = await instance.get<BirdsAPI[]>('/birds');
        return response.data;
    }
};
