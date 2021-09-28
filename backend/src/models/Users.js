const {Schema, model} = require('mongoose');

const users = new Schema({
    id: {type: Number, unique: true, required: true},
    login: {type: String, required: true, unique: true},
    email: {type: String},
    password: {type: String, required: true}
});

module.exports = model('Users', users);