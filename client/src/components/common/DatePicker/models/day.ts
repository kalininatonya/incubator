export interface Day {
    date: Date;
    currentMonth: boolean;
}

export interface DayOfWeek {
    id: number;
    dayName: string;
    shortDayName: string;
    previousDays: number;
}