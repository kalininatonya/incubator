const commonServices = require('./commonServices');
const Settings = require('../models/Settings');

//Достаем настройку для конкретного дня - актуального(СЕГОДНЯ)(
// Для отображения актуальных данных на /incubator(влажность и температура)
async function getDaySetting(incubatorId, userId) {
    const today = new Date();
    const setting = await Settings.findOne({
        userId,
        incubatorId: incubatorId,
        startDateTime: {$lte: today},
        endDateTime: {$gt: today}
    }).lean();
    //temperature и humidity === null если день инкубации задан будущим/или прошлым(архивные) числом, тк инкубация еще не началась или давно закончилась, то и отображать на
    //главной странице нечего
    const temperature = setting ? setting.temperature : null;
    const humidity = setting ? setting.humidity : null;

    return {temperature, humidity};
}

//Достаем дату конечного дня икубации
async function getFinishDateTimeSetting(day, userId, incubatorId) {
    const setting = await Settings.findOne({userId, day, incubatorId}).lean();

    return setting ? setting.endDateTime : null;
}

//Достаем настройки для конкретного 1 инкубатора(все настройки)
async function getSettings(incubatorId, userId) {
    return (await Settings.find({userId, incubatorId}).lean());
}

//Достаем настройки для конкретного инкубатора(все настройки) и добавляем доп поля и удаляем лишнее(с бд лишние поля)
async function listSettings(incubatorId, userId) {
    const settings = await Settings.find({userId, incubatorId}).lean();
    const today = new Date();
    return settings.map(setting => {
        const {
            startDateTime,
            endDateTime,
            day,
            temperature,
            humidity,
            description,
        } = setting;
        //Флаг для подсветки настроек для текущего дня -СЕГОДНЯ
        const actual = (today >= new Date(startDateTime) && today < new Date(endDateTime));

        return {day, startDateTime, endDateTime, description, temperature, humidity, isActual: actual};
    });
}

//Удаляем все настройки у конкретного инкубатора
async function deleteSettings(incubatorId, userId) {
    await Settings.deleteMany({userId, incubatorId}).lean();
}

//Добавляем настройки для конкретного инкубатора
async function addSettings(incubator, userId) {
    //Добавляем дату для каждого дня инкубации
    const settings = await commonServices.dateCalculation(incubator.bird.id, incubator.dateTime);
    for (let i = 0; i < settings.length; i += 1) {
        const {
            day, dateTime, temperature, humidity, description
        } = settings[i];
        const newSettings = new Settings({
            userId,
            incubatorId: incubator.id,
            startDateTime: dateTime,
            endDateTime: commonServices.findNextDateTime(dateTime),
            day, temperature, humidity, description
        });
        await newSettings.save();
    }

    return (await getSettings(incubator.id, userId));
}

//Редактируем настройки у конкретного инкубатора
async function editSettings(incubator, userId) {
    //Удаляем настройки
    await deleteSettings(incubator.id, userId);
    //Добавляем новые настройки на случай если дата или птица изменилась и возвращаем их
    return (await addSettings(incubator, userId));
}

module.exports = {
    getDaySetting,
    getFinishDateTimeSetting,
    listSettings,
    deleteSettings,
    addSettings,
    editSettings,
};