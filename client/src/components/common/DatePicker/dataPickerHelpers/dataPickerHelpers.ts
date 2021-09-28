import {dayOfWeek, MONTHS_IN_YEAR, monthsData, WEEKS_IN_MONTH} from '../datePickerConstants/datePickerConstants';
import {createArrayNumbers} from '../../../../helpers/common';
import {List, Node} from '../../../../helpers/linkedList/linkedList';
import {Month, MonthData} from '../models/months';
import {Day, DayOfWeek} from '../models/day';

const arrayMonths = createArrayNumbers(MONTHS_IN_YEAR, true);
const monthsList = List.fromArray(arrayMonths);

//Находим нужную Node и возвращаем выбранный месяц(Node)
export const getNodeMonth = (monthId: number): Node | null => monthsList.find(monthId);

//Находим предыдущий месяц
export const getPrevMonth = (monthId: number): MonthData => {
    const prevMonthId = getNodeMonth(monthId)?.prev?.value;
    return monthsData[prevMonthId as Month];
}

//Находим следующий месяц
export const getNextMonth = (monthId: number): MonthData => {
    const nextMonthId = getNodeMonth(monthId)?.next?.value;
    return monthsData[nextMonthId as Month];
}

//Проверка на высокосность
export const isLeapYear = (year: number): boolean => {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

//Определение текущего дня для выделения выбранного дня, либо для выделения текущего
export const areEqual = (a: Date, b: Date): boolean => {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

//Возвращаем количество дней в месяце с учетом высокосного года
export const getDaysInMonth = (year: number, month: MonthData): number => {
    const {id, days} = month as MonthData;
    const leapYear = isLeapYear(year);
    if (leapYear && id === Month.February) {
        return days + 1;
    }

    return days;
}

//Возвращаем день недели с которого начинается месяц
export const getDayOfWeek = (year: number, monthId: number): DayOfWeek | undefined => {
    //1 число выбранного месяца и года
    const date = new Date(year, monthId);
    //Вернуть день недели от 0 (воскресенье) до 6 (суббота).
    const dayWeek = date.getDay();

    //Найти день недели(допустим сб(6 день) в статичном массиве с днями недели
    return dayOfWeek.find(({id}) => id === dayWeek);
}

export const getYear = (month: MonthData, selectedMonth: MonthData, selectedYear: number): number | undefined => {
    let newYear = selectedYear !== null ? selectedYear : undefined;
    if (selectedMonth !== null && selectedYear !== null) {
        //Убывают с Января -- Декабрь
        if (month.id === Month.December && selectedMonth.id === Month.January) {
            newYear = selectedYear - 1;
        }
        //Возрастают с Декабря -- Январь
        if (month.id === Month.January && selectedMonth.id === Month.December) {
            newYear = selectedYear + 1;
        }
    }

    return newYear;
}

//Массив дней которые отображаются в календарике
export const getVisibleDays = (year: number, month: MonthData): Day[][] => {
    //Достаем id выбранного месяца(selectedMonth)
    const {id} = month as MonthData;
    //Массив недель в месяце с днями за каждую неделю -
    //Каждый массив недель, включает подмассив дней- каждый день это объект с датой и булевым значением,
    // которое необходимо чтобы понять относится ли число к выбранному месяцу(для выделения цветом)
    //[[{date: Sun Oct 02 2022 00:00:00 GMT+0500 (Екатеринбург, стандартное время), currentMonth: true}, {}, {}...], [], []...]
    const visibleDays = [];
    //Количество дней в выбранном месяце с учетом высокосного года
    const daysInMonth = getDaysInMonth(year, month);
    //Достаем количество дней в предыдущем месяце с учетом высокосного года
    const daysInPrevMonth = getPrevMonth(id).days;
    //Месяц начинается в такой -то день, например 1 октября 2022г это сб -
    // {id: 6, dayName: 'Суббота', shortDayName: 'сб', previousDays: 5}
    const monthStartsOn = getDayOfWeek(year, id);
    //Id предыдущего месяца
    const prevMonthId = getPrevMonth(id).id;
    //Id следующего месяца
    const nextMonthId = getNextMonth(id).id;

    if (monthStartsOn !== undefined) {
        //Количество недель в выбранном месяце
        const weeks = WEEKS_IN_MONTH;
        let day = 1; //Количество дней в выбранном месяце
        //Дни предыдущего месяца.
        let dayPrev = daysInPrevMonth - (monthStartsOn.previousDays - 1);
        //Дни следующего месяца
        let dayNext = 1;
        for (let i = 0; i < weeks; i += 1) {
            let daysInWeek = []; //Каждая неделя с днями
            for (let j = 0; j < dayOfWeek.length; j += 1) {
                //Если день больше дней в месяце, значит это идет уже след месяц
                if (day > daysInMonth) {
                    //Следующий месяц
                    const newYear = getYear(getNextMonth(id), month, year);
                    if (newYear !== undefined) {
                        daysInWeek.push({date: new Date(newYear, nextMonthId, dayNext), currentMonth: false})
                    }
                    dayNext += 1;
                    //i===0 - это значит мы находимся на первой неделе месяца
                } else if (i === 0 && j < monthStartsOn.previousDays && dayPrev) {
                    //Предыдущий месяц
                    const newYear = getYear(getPrevMonth(id), month, year);
                    if (newYear !== undefined) {
                        daysInWeek.push({date: new Date(newYear, prevMonthId, dayPrev), currentMonth: false});
                    }
                    dayPrev += 1;
                } else {
                    daysInWeek.push({date: new Date(year, id, day), currentMonth: true});
                    day += 1;
                }
            }
            visibleDays.push(daysInWeek);
            daysInWeek = [];
        }
    }

    return visibleDays;
}