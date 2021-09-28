const {MS_IN_DAY} = require('../constants');
const BirdsSettingsCatalog = require('../models/BirdsSettingsCatalog.js');

//Генерация Id
async function generatorId(Model) {
    const incubatorWithMaxId = await Model.find().sort({id: -1}).limit(1);
    return incubatorWithMaxId.length !== 0 ? (incubatorWithMaxId[0].id + 1) : 1;
}

//Рассчет даты для каждого дня инкубации
async function dateCalculation(birdId, dateTime) {
    const birdsSettings = await BirdsSettingsCatalog.findOne({birdId: birdId}).lean();
    let settings = [];
    let lastDate = new Date(dateTime);
    for (let i = 0; i < birdsSettings.days.length; i += 1) {
        settings.push({...birdsSettings.days[i], dateTime: lastDate});
        lastDate = new Date(lastDate);
        lastDate.setDate(lastDate.getDate() + 1);
    }

    return settings;
}

//Рассчет количества дней до конца инкубации
function countDays(days, datetime) {
    //Парсим дату начала инкубации в мс
    const datetimeMS = Date.parse(datetime);
    const today = Date.now(); //Текущая дата
    //Находим количество дней которое прошло с начала инкубации до текущей даты
    const partDays = Math.floor((today - datetimeMS) / MS_IN_DAY);
    //Находим сколько дней осталось до конца инкубации(вычитаем из всего цикла инкубации - количество прошедших дней)
    return (days - partDays);
}

//Находим следующие сутки
function findNextDateTime(startDateTime) {
    const datetimeMS = Date.parse(startDateTime);
    return (new Date(MS_IN_DAY + datetimeMS));
}

//Составляем диапазон
const generateSentenceWithRange = (diapason, params = '') => {
    return (diapason.from === diapason.to) ? `${diapason.from}${params}` : `от ${diapason.from}${params} до ${diapason.to}${params}`;
};

//"10.01.2022"
const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
};

//03 : 15
const formatTime = (dateTime) => {
    let hours = String(new Date(dateTime).getHours()).padStart(2, '0');
    let minutes = String(new Date(dateTime).getMinutes()).padStart(2, '0');

    return `${hours} : ${minutes}`;
}

module.exports = {
    generatorId,
    dateCalculation,
    formatDate,
    formatTime,
    countDays,
    findNextDateTime,
    generateSentenceWithRange
};