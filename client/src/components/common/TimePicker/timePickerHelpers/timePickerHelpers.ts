import {createArrayNumbers} from '../../../../helpers/common';
import {List} from '../../../../helpers/linkedList/linkedList';
import {Time} from '../models/time';

const arrayHours = createArrayNumbers(Time.Hours, true);
const hoursList = List.fromArray(arrayHours);
const arrayMinutes = createArrayNumbers(Time.Minutes, true);
const minutesList = List.fromArray(arrayMinutes);

//Находим нужную Node и возвращаем либо минуты либо часы(Node)
export const getTime = (time: number, unitsOfTime: Time) => {
    let selectedTime;
    if (unitsOfTime === Time.Hours) {
        selectedTime = hoursList.find(time);
    } else {
        selectedTime = minutesList.find(time);
    }

    return selectedTime;
}

//При клике формируем видимые часы и минуты
export const getVisibleTime = (time: number, unitsOfTime: Time, countOfIterations: number) => {
    const visibleTime = [];
    let selectedTime = getTime(time, unitsOfTime);

    //Добавляем 2 числа до выбранного
    let i = 0;
    while (i < countOfIterations) {
        selectedTime = selectedTime && selectedTime.prev;
        selectedTime && visibleTime.unshift(selectedTime.value);
        i++;
    }

    //Добавляем выбранное число
    visibleTime.push(time);

    //Добавляем 2 числа после выбранного
    selectedTime = getTime(time, unitsOfTime);
    let j = 0;
    while (j < countOfIterations) {
        selectedTime = selectedTime && selectedTime.next;
        selectedTime && visibleTime.push(selectedTime.value);
        j++;
    }

    return visibleTime;
}
