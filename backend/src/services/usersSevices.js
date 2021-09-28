const bcrypt = require('bcryptjs');
const Users = require('../models/Users.js');
const commonServices = require('../services/commonServices');

//Достаем конкретного пользака
//Логин уникальный, регистрозависимый
async function getUser(login) {
    return (await Users.findOne({login}).lean());
}

//Добавление нового пользователя
async function addUser(data) {
    const {login, email, password} = data;

    const [id, hashedPassword] = await Promise.all([
        commonServices.generatorId(Users),
        bcrypt.hash(password, 12)  //Шифруем пароль
    ]);

    const user = new Users({
        id, login, email, password: hashedPassword
    });
    await user.save();

    return (await getUser(login));
}

module.exports = {getUser, addUser};