export const formatDate = (dateTime: Date): string => {
    return new Date(dateTime).toLocaleDateString();
};

const dateParsing = (date: string) => {
    const dateArray = date.split('.').reverse();
    return {year: Number(dateArray[0]), month: Number(dateArray[1]), day: Number(dateArray[2])};
}

const timeParsing = (time: string) => {
    const timeArray = time.split(':');
    return {hour: Number(timeArray[0].trim()), minute: Number(timeArray[1].trim())};
}

//1 Fri Feb 03 2023 19:14:00 GMT+0500 (Екатеринбург, стандартное время)
export const dateTimeParsing = (date: string, time: string): Date => {
    const {year, month, day} = dateParsing(date);
    const {hour, minute} = timeParsing(time);

    return new Date(year, month - 1, day, hour, minute);
}

//Для настроек
export const formatTimeForDateTime = (dateTime: Date): string => {
    let hours = String(new Date(dateTime).getHours());
    let minutes = String(new Date(dateTime).getMinutes());
    return `${hours.padStart(2, '0')} : ${minutes.padStart(2, '0')}`;
}

//03 : 05
export const formatTime = (hour: number, minutes: number): string => {
    return `${String(hour).padStart(2, '0')} : ${String(minutes).padStart(2, '0')}`;
}

//31.05.2022
export const dateFormatting = (date: Date): string => {
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    return `${day}.${month}.${year}`;
};