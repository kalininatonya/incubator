const BirdsCatalog = require('../models/BirdsCatalog');

async function listBirds() {
    //Достаем из бд список птиц
    return (await BirdsCatalog.find());
}

module.exports = {listBirds};