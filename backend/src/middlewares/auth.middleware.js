const jwt = require('jsonwebtoken');
const config = require('config');
const {
    UNAUTHORIZED_ERROR_STATUS_CODE,
    UNAUTHORIZED_MESSAGE_ERROR,
} = require('../constants');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        //Проверяем если в headers пришел заголовок authorization то все хорошо
        const token = req.headers['authorization'].split(' ')[1]; //"Bearer TOKEN"

        if (!token) {
            return res.status(UNAUTHORIZED_ERROR_STATUS_CODE).json(UNAUTHORIZED_MESSAGE_ERROR);
        }
        //Если токен есть то мы верифицируем токен(проверяем валидный ли токен(не протух ли он))
        req.user = jwt.verify(token, config.get('jwtSecret'));
        next();

    } catch (e) {
        console.error(e);
        return res.status(UNAUTHORIZED_ERROR_STATUS_CODE).json(UNAUTHORIZED_MESSAGE_ERROR);
    }
};