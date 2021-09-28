import {StatusCode} from './models/statusCode.enum';

export const STORAGE_NAME = 'userData';

export const warnings = {
    required: 'Обязательно для заполнения',
    modalConfirmationQuestion: 'Вы действительно хотите удалить инкубацию?',
    incubationHasNotStarted: 'Инкубация еще не началась',
    incubationFinished: 'Инкубация завершилась',
};

export const commonServerErrors = {
    gatewayTimeout: {
        errorCode: StatusCode.GatewayTimeout,
        message: 'Сайт временно недоступен, попробуйте позже',
        statusCode: 'Gateway Timeout',
    },
    unauthorized: {
        errorCode: StatusCode.Unauthorized,
        message: 'Пользователь не авторизован',
        statusCode: 'Unauthorized',
    }
}