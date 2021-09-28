const {Schema, model} = require('mongoose');

const birdsCatalog = new Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    days: {type: Number, required: true}
});

module.exports = model('Birds', birdsCatalog);