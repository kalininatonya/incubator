import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {STORAGE_NAME} from '../../constants';
import {StatusCode} from '../../models/statusCode.enum';

//Перед вызовом запроса будет вызван интерцептор и добавит к headers доп header c токеном
const addAuthToken = (request: AxiosRequestConfig) => {
    const sessionStorageData = sessionStorage.getItem(STORAGE_NAME);
    if (sessionStorageData) {
        const data = JSON.parse(sessionStorageData);
        if (data && data.token) {
            request.headers = {...request.headers, Authorization: `Bearer ${data.token}`}
        }
    }
    return request;
};

//Если вернется статус код 401 то произойдет редирект на стр авторизации
//Если вернется статус код 504 то произойдет редирект на стр заглушки с ошибкой
const checkErrors = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
            case StatusCode.Unauthorized:
                sessionStorage.removeItem(STORAGE_NAME);
                window.location.href = `${process.env.PUBLIC_URL}/login`;
                break;
            case StatusCode.GatewayTimeout:
                window.location.href = `${process.env.PUBLIC_URL}/error`;
                break;
        }
    }
}

//Регистрация interceptors
export const registerInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(addAuthToken);
    instance.interceptors.response.use(undefined, checkErrors);
}
