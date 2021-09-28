import {Months, Month} from '../models/months';

export const MONTHS_IN_YEAR = 12;
export const WEEKS_IN_MONTH = 6;

export const monthsData: Months = {
    [Month.January]: {id: Month.January, month: 'Январь', days: 31},
    [Month.February]: {id: Month.February, month: 'Февраль', days: 28},
    [Month.March]: {id: Month.March, month: 'Март', days: 31},
    [Month.April]: {id: Month.April, month: 'Апрель', days: 30},
    [Month.May]: {id: Month.May, month: 'Май', days: 31},
    [Month.June]: {id: Month.June, month: 'Июнь', days: 30},
    [Month.July]: {id: Month.July, month: 'Июль', days: 31},
    [Month.August]: {id: Month.August, month: 'Август', days: 31},
    [Month.September]: {id: Month.September, month: 'Сентябрь', days: 30},
    [Month.October]: {id: Month.October, month: 'Октябрь', days: 31},
    [Month.November]: {id: Month.November, month: 'Ноябрь', days: 30},
    [Month.December]: {id: Month.December, month: 'Декабрь', days: 31},
};

export const dayOfWeek = [
    {id: 1, dayName: 'Понедельник', shortDayName: 'пн', previousDays: 0},
    {id: 2, dayName: 'Вторник', shortDayName: 'вт', previousDays: 1},
    {id: 3, dayName: 'Среда', shortDayName: 'ср', previousDays: 2},
    {id: 4, dayName: 'Четверг', shortDayName: 'чт', previousDays: 3},
    {id: 5, dayName: 'Пятница', shortDayName: 'пт', previousDays: 4},
    {id: 6, dayName: 'Суббота', shortDayName: 'сб', previousDays: 5},
    {id: 0, dayName: 'Воскресенье', shortDayName: 'вс', previousDays: 6}
];