const {Schema, model} = require('mongoose');

const incubator = new Schema({
    id: {type: Number, unique: true, required: true},
    userId: {type: Number, required: true},
    birdId: {type: Number, required: true},
    breed: {type: String},
    count: {type: Number},
    description: {type: String},
    dateTime: {type: Date, required: true},
    isActual: {type: Boolean}
});

module.exports = model('Incubator', incubator);