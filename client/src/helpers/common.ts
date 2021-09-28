import {AxiosError} from 'axios';
import {CommonError} from '../models/commonError';
import {commonServerErrors} from '../constants';
import {StatusCode} from '../models/statusCode.enum';

//Собираем массив из чисел, который начинается либо с 0, либо с 1 - [0, 1, 2, 3,...] длиной length
export const createArrayNumbers = (length: number, isZeroFirstValue: boolean = false): number[] => {
    //Первый элемент массива равен 0
    if (isZeroFirstValue) {
        return Array.from({length: length}, (v, i) => i);
    }
    //Первый элемент массива равен 1
    return Array.from({length: length}, (v, i) => i + 1);
};

//Для обработки ошибок в блоках catch
//Для отображения текста ошибки 504 под формой и для остальных ошибок сервера
export const checkErrors = (error: AxiosError<CommonError>) => {
    let serverError = null;
    if (error.response) {
        switch (error.response.status) {
            case StatusCode.GatewayTimeout:
                serverError = {...commonServerErrors.gatewayTimeout};
                break;
            default:
                console.log(error.response.data.message);
                serverError = {...error.response.data};
                break;
        }
    }
    return serverError;
}