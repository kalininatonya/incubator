const jwt = require('jsonwebtoken');
const config = require('config');

//Генерация ключа на 3ч
function generationToken(id) {
    //jwtSecret это ключ для зашифровки(лучше не менять)
    return (jwt.sign(
        {userId: id},
        config.get('jwtSecret'),
        {expiresIn: '3h'}
    ));
}

module.exports = {generationToken};
