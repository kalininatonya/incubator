const express = require('express'); //подключаем express
const config = require('config'); //подключаем пакет config
const mongoose = require('mongoose'); //Подключаем mongo db

const app = express(); //сервер

app.use(express.json({extended: true}));

//Список роутов
app.get('/api/version', (req, res) => res.send('version 0.0.1'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/incubator', require('./routes/incubator.routes'));
app.use('/api/download', require('./routes/download.routes'));
app.use('/api/birds', require('./routes/birds.routes'));
app.use('/api/settings', require('./routes/settings.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongo.uri'), {
            dbName: config.get('mongo.dbName') || undefined,
            user: config.get('mongo.user') || undefined,
            pass: config.get('mongo.pass') || undefined,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); //Подключаемся к бд, тк промис то await чтобы подождать пока промис завершится
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1); //Завершим процесс в случае ошибки
    }
}

start();
