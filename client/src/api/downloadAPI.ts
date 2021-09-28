import axios from 'axios';
import {saveAs} from 'file-saver';
import {registerInterceptors} from './interceptors/interceptors';

const instance = axios.create({
    baseURL: `${process.env.PUBLIC_URL}/api`,
});
//Регистрируем интерсепторы-мидлвара которая добавляет токен авторизации в headers
//Функция которая вызывается при каждом запросе
registerInterceptors(instance);

export const downloadAPI = {
    async downloadFile(incubatorId: number) {
        const response = await instance.get<string>(`/download/${incubatorId}`, {responseType: 'blob'});

        //Выгружаем
        const pdfBlob = new Blob([response.data], {type: 'application/pdf'});
        saveAs(pdfBlob, 'download.pdf');
    },
};
