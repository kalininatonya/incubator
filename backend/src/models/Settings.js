const {Schema, model} = require('mongoose');

//Настройки для инкубации
const settings = new Schema({
    incubatorId: {type: Number, required: true},
    userId: {type: Number, required: true},
    day: {type: Number, required: true},
    startDateTime: {type: Date, required: true},
    endDateTime: {type: Date, required: true},
    temperature: {
        from: {type: Number},
        to: {type: Number}
    },
    humidity: {
        from: {type: Number},
        to: {type: Number}
    },
    description: {type: String}
});

module.exports = model('Settings', settings);