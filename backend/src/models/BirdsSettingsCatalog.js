const {Schema, model} = require('mongoose');

//Справочник с настройками инкубации для каждой птицы из справочника птиц
const birdsSettingsCatalog = new Schema({
    birdId: {type: Number, unique: true, required: true},
    days: [{
        day: {type: Number, required: true},
        temperature: {
            from: {type: Number},
            to: {type: Number}
        },
        humidity: {
            from: {type: Number},
            to: {type: Number}
        },
        description: {type: String}
    }]
});

module.exports = model('BirdsSettings', birdsSettingsCatalog);