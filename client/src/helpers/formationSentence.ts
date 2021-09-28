export const makeSentenceWithLeftDays = (days: number) => {
    const ten = days % 10;
    const hundred = days % 100;

    // 1, 21, 101, 121, но не 11, 111, 211...
    if (ten === 1 && hundred !== 11) {
        return `(Остался ${days} день)`;
    }

    // 2, 3, 4, 22, 33, 44, 152, 163, 174, но не 12, 13, 14, 112, 213, 314...
    if (ten >= 2 && ten <= 4 && (hundred < 10 || hundred >= 20)) {
        return `(Осталось ${days} дня)`;
    }

    return `(Осталось ${days} дней)`;
};

export const generateSentenceWithRange = (diapason: {from: number, to: number}, params: string ='') => {
    return (diapason.from === diapason.to) ? `${diapason.from}${params}` : `от ${diapason.from}${params} до ${diapason.to}${params}`;
};

export const generateShortRange = (diapason: {from: number, to: number}, params: string ='') => {
    return (diapason.from === diapason.to) ? `${diapason.from}${params}` : `${diapason.from}${params} - ${diapason.to}${params}`;
};