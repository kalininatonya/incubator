import axios from 'axios';
import {registerInterceptors} from './interceptors/interceptors';
import {SettingsAPI} from './models/settingsAPI';

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/api/settings`
});
//Регистрируем интерсепторы-мидлвара которая добавляет токен авторизации в headers
registerInterceptors(instance);

export const settingsAPI = {
    //Достаем настройки на весь период инкубации для конкретного периода(инкубатора)
    async listSettings(incubatorId: number): Promise<SettingsAPI> {
        const response = await instance.get<SettingsAPI>(`/${incubatorId}`);
        return response.data;
    },
};
