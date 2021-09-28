const constants = {
    MS_IN_DAY: 86400000,
    NUMBER_OF_ITEMS_PER_PAGE: 10,
    SERVER_ERROR_STATUS_CODE: 500,
    CREATED_STATUS_CODE: 201,
    SUCCESS_STATUS_CODE: 200,
    UNAUTHORIZED_ERROR_STATUS_CODE: 401,
    BAD_REQUEST_ERROR_STATUS_CODE: 400,
    MESSAGE_ERROR: {id: 1, message: 'Что-то пошло не так, попробуйте снова'},
    UNAUTHORIZED_MESSAGE_ERROR: {id: 2, message: 'Нет авторизации'},
    INCORRECT_DATA_MESSAGE_ERROR : {id: 3, message: 'Некорректные данные'},
    INCUBATOR_REMOVAL_MESSAGE_SUCCESSFUL: {id: 4, message: 'Инкубатор удален успешно'},
    USER_IS_NOT_FOUND_MESSAGE_ERROR : {id: 5, message: 'Пользователь не найден'},
    USER_EXISTS_MESSAGE_ERROR : {id: 6, message: 'Такой пользователь уже существует'},
    USER_CREATED_MESSAGE_SUCCESS : {id: 7, message: 'Пользователь создан'},
}

module.exports = constants;
