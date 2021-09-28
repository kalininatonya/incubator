const BirdsCatalog = require('../models/BirdsCatalog.js');
const Incubator = require('../models/Incubator.js');
const commonServices = require('./commonServices');
const settingsServices = require('./settingsServices');

async function getIncubator(incubatorId, userId) {
    const {
        id,
        birdId,
        breed,
        count,
        description,
        dateTime
    } = await Incubator.findOne({userId, id: incubatorId}).lean();

    const bird = await BirdsCatalog.findOne({id: birdId}).lean();
    //Количество дней до конца инкубации
    const daysCounter = commonServices.countDays(bird.days, dateTime);
    const daysLeft = daysCounter > 0 ? daysCounter : null;
    //Достаем дату последнего дня инкубации
    const endDateTime = await settingsServices.getFinishDateTimeSetting(bird.days, userId, id);
    return {
        id,
        breed,
        count,
        description,
        dateTime,
        daysLeft,
        bird: {id: bird.id, name: bird.name, days: bird.days},
        isActual: daysCounter > 0,
        finishDateTime: endDateTime
    }
}

//Список инкубационных периодов у конкретного юзера
async function listIncubators(userId) {
    //Достаем список инкубаторов
    const incubators = await Incubator.find({userId}).lean();
    const result = [];
    for (let i = 0; i < incubators.length; i += 1) {
        const incubatorPromise = getIncubator(incubators[i].id, userId);
        //Достаем настройки для конкретного инкубатора
        const settingsPromise = settingsServices.getDaySetting(incubators[i].id, userId);
        const arrayPromises = Promise.all([
            incubatorPromise,
            settingsPromise
        ]).then(([incubatorPromise, settingsPromise]) => ({...incubatorPromise,...settingsPromise}));

        result.push(arrayPromises);
    }

    return await Promise.all(result);
}

//Создание инкубатора
async function addIncubator(formData, userId) {
    const {birdId, breed, count, description, dateTime} = formData;
    //Дата и время создания инкубатора
    const newDateTime = new Date(dateTime);
    //Для генерации id
    const id = await commonServices.generatorId(Incubator);
    //Сохранение объекта в бд
    const newIncubator = new Incubator({
        id, userId, birdId, breed, count, description, dateTime: newDateTime
    });
    await newIncubator.save();

    return (await getIncubator(newIncubator.id, userId));
}

async function editIncubator(formData, incubatorId, userId) {
    const {birdId, breed, count, description, dateTime} = formData;
    //Дата и время создания инкубатора
    const newDateTime = new Date(dateTime);
    const newIncubator = {userId, birdId, breed, count, description, dateTime: newDateTime}
    //Обновление инкубатора
    await Incubator.updateOne({userId, id: incubatorId}, {$set: newIncubator});

    return (await getIncubator(incubatorId, userId));
}

async function deleteIncubator(incubatorId, userId) {
    await Incubator.deleteOne({userId, id: incubatorId}).lean();
}

module.exports = {
    getIncubator,
    listIncubators,
    addIncubator,
    editIncubator,
    deleteIncubator
};