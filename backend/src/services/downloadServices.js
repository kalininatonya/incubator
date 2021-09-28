const commonServices = require('./commonServices');

//Генерация строк в таблице с текстом
function generateRow(settings) {
    const tableHeader = ['', 'Дата', 'Настройки', 'Описание'];
    const result = [tableHeader];
    let count = 1;
    //Заполняем ячейки в таблице
    for (let i = 0; i < settings.length; i += 1) {
        const startDateTime = commonServices.formatDate(settings[i].startDateTime);
        const endDateTime = commonServices.formatDate(settings[i].endDateTime);
        const humidity = `Влажность: ${commonServices.generateSentenceWithRange(settings[i].humidity, '%')}`;
        const temperature = `Температура: ${commonServices.generateSentenceWithRange(settings[i].temperature, 'C')}`;
        const description = {ul: settings[i].description.split('.')};

        result.push([String(count), {
            text: `${startDateTime}—${endDateTime}`,
            fontSize: 10
        }, `${humidity} ${temperature}`, description]);
        count += 1;
    }
    return result;
}

//Собираем PDF
function createDocDefinition(settings, incubator) {
    const fields = [];
    if (incubator.breed) {
        fields.push({text: `Порода: ${incubator.breed}`, margin: 2, fontSize: 12});
    }
    if (incubator.count) {
        fields.push({text: `Количество яиц: ${incubator.count}`, margin: 2, fontSize: 12});
    }
    if (incubator.description) {
        const description = incubator.description.replace(/\r?\n/g, ' ');
        fields.push({text: `Описание: ${description}`, margin: [2, 2, 2, 10], fontSize: 12})
    }

    return {
        content: [
            {text: incubator.bird.name, style: 'header'},
            {
                text: `Дата начала инкубации: ${commonServices.formatDate(incubator.dateTime)} ${commonServices.formatTime(incubator.dateTime)}`,
                margin: 2,
                fontSize: 12
            },
            ...fields,
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 1,
                    widths: [15, 100, 150, '*'],
                    body: generateRow(settings)
                },
                style: 'table'
            }
        ],
        styles: {
            header: {
                fontSize: 15,
                alignment: 'center',
                bold: true,
                margin: [5, 10]
            },
            table: {
                fontSize: 12,
            }
        }
    };
}

module.exports = {createDocDefinition};