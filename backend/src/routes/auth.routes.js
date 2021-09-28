const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const {
    SERVER_ERROR_STATUS_CODE,
    BAD_REQUEST_ERROR_STATUS_CODE,
    CREATED_STATUS_CODE,
    MESSAGE_ERROR,
    INCORRECT_DATA_MESSAGE_ERROR,
    USER_IS_NOT_FOUND_MESSAGE_ERROR,
    USER_EXISTS_MESSAGE_ERROR,
    USER_CREATED_MESSAGE_SUCCESS,
} = require('../constants')
const authServices = require('../services/authSevices');
const usersServices = require('../services/usersSevices');

const checkErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST_ERROR_STATUS_CODE).json({
            errors: errors.array(),
            INCORRECT_DATA_MESSAGE_ERROR
        })
    }
};

// /api/register
router.post(
    '/register',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Минимальная длина пароля 4 символа').isLength({min: 4})
    ],
    async (req, res) => {
        try {
            const {login} = req.body;
            //Проверяем есть ли ошибки
            checkErrors(req, res);
            //Проверяем есть ли такой пользователь в бд
            const candidate = await usersServices.getUser(login);
            if (candidate) {
                //'Такой пользователь уже существует'
                return res.status(BAD_REQUEST_ERROR_STATUS_CODE).json(USER_EXISTS_MESSAGE_ERROR);
            }
            //Сохранение юзера
            const newUser = await usersServices.addUser(req.body);
            //Генерация ключа на 1ч
            const token = authServices.generationToken(newUser.id);

            res.status(CREATED_STATUS_CODE).json({message: USER_CREATED_MESSAGE_SUCCESS, token, userId: newUser.id, login});
        } catch (e) {
            console.error(e);
            res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
        }
    });

// /api/login
router.post(
    '/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            //Проверяем есть ли ошибки
            checkErrors(req, res);
            const {login, password} = req.body;
            //Ищем в базе юзера с таким же логином
            //Если такого юзера нет в системе,то надо зарегистрироваться
            const user = await usersServices.getUser(req.body.login);
            if (!user) {
                return res.status(BAD_REQUEST_ERROR_STATUS_CODE).json(USER_IS_NOT_FOUND_MESSAGE_ERROR);
            }
            //Расшифровываем пароль чтобы сравнить с паролем в БД
            //compare сравниваем текущий пароль с тем зашифрованнным который лежит в БД
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(BAD_REQUEST_ERROR_STATUS_CODE).json(INCORRECT_DATA_MESSAGE_ERROR);
            }

            //Генерация ключа на 3ч
            const token = authServices.generationToken(user.id);

            return res.json({token, userId: user.id, login});
        } catch (e) {
            console.error(e);
            return res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
        }
    });

module.exports = router;