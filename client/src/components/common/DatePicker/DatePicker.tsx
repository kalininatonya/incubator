import * as React from 'react';
import {MouseEvent, useEffect, useRef, useState} from 'react';
import cn from 'classnames';

import {dayOfWeek, monthsData} from './datePickerConstants/datePickerConstants';
import {useOutsideClick} from '../../../hooks/outsideClick.hook';
import {dateFormatting} from '../../../helpers/formatDate';
import {required} from '../../../helpers/validators/validators';
import {
    areEqual,
    getPrevMonth,
    getNextMonth, getVisibleDays, getYear
} from './dataPickerHelpers/dataPickerHelpers';

import {IconCalendar} from '../icons/IconCalendar/IconCalendar';
import {IconStar} from '../icons/IconStar/IconStar';
import {Popup} from '../Popup/Popup';
import {IconLeft} from '../icons/IconsLeftAndRight/IconLeft';
import {IconRight} from '../icons/IconsLeftAndRight/IconRight';

import {FormFieldsProps} from '../../../models/forms/formFieldsProps';
import {MonthData, Months, Month} from './models/months';
import styles from './DatePicker.module.css';

export const DatePicker: React.FC<FormFieldsProps> = ({
                                                              name,
                                                              type,
                                                              autoFocus,
                                                              placeholder,
                                                              isRequired,
                                                              error,
                                                              register,
                                                              setValue,
                                                          }) => {
    const labelRef = useRef<HTMLLabelElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    //Выбранный день/месяц/год который сейчас отображается в календарике
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    //Закрыть Popup по клику в молоко
    useOutsideClick(labelRef, () => {
        setIsOpen(false);
    });

    const openAndCloseCalendar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        //Текущий месяц для первичной отрисовки календарика
        const month = monthsData[new Date().getMonth() as keyof Months];
        setSelectedMonth(month);

        //Текущий год
        const year = new Date().getFullYear();
        setSelectedYear(year);

        //Текущее число
        const today = new Date();
        setSelectedDay(today);
    }, []);

    //Устанавливаем выбранное значение в инпут, когда открыли окно
    useEffect(() => {
        if (isOpen && selectedYear !== null && selectedMonth !== null && selectedDay !== null) {
            const date = new Date(selectedYear, selectedMonth.id, selectedDay.getDate());
            const value = dateFormatting(date);

            setValue && setValue(name, value, {
                shouldValidate: true
            });
        }
    }, [isOpen, selectedDay, selectedMonth, selectedYear, name, setValue]);


    //Выбираем нужный месяц в зависимости от кого в какую сторону листаем календарик
    const getSelectedMonth = (id: string): MonthData | undefined => {
        let newSelectedMonth: MonthData | undefined;
        //Месяцы убывают. Декабрь(12) -> Ноябрь -> Октябрь
        if (id === 'left') {
            newSelectedMonth = selectedMonth !== null ? getPrevMonth(selectedMonth.id) : undefined;
        }
        //Месяцы возрастают. Декабрь(12) -> Январь -> Февраль
        if (id === 'right') {
            newSelectedMonth = selectedMonth !== null ? getNextMonth(selectedMonth.id) : undefined;
        }

        return newSelectedMonth;
    }

    //Если переключаем месяцы руками в календарике
    const changeMonth = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const {id} = (event.target as HTMLElement); //left || right
        const month = getSelectedMonth(id);
        if (month !== undefined && selectedMonth !== null && selectedYear !== null) {
            setSelectedMonth(month);
            const year = getYear(month, selectedMonth, selectedYear);
            if (year !== undefined && year !== selectedYear) {
                setSelectedYear(year);
            }
        }
    }

    //Меняем день по клику
    const changeDay = (date: Date) => {
        const monthId = date.getMonth();
        let year;
        if (selectedMonth !== null && selectedYear !== null) {
            year = getYear(monthsData[monthId as Month], selectedMonth, selectedYear);
        }
        //Если кликнули по дню следующего или прошлого месяца, то месяц в шапке должен измениться
        if (selectedMonth !== null && monthId !== selectedMonth.id) {
            setSelectedMonth(monthsData[monthId as Month]);
        }
        //Меняем год если месяц изменился с января на декабрь и наоборот
        if (year !== undefined && year !== selectedYear) {
            setSelectedYear(year);
        }
        setSelectedDay(date);
    }

    //Для преобразования чисел к дате
    const getNewSelectedDay = (year: number, month: MonthData, day: number): Date => {
        return new Date(year, month.id, day);
    }

    const changeDateWithKeyboard = (event: React.KeyboardEvent<HTMLLabelElement>) => {
        const {code} = event;

        let newSelectedDay: number | undefined = selectedDay !== null ? selectedDay?.getDate() : undefined;
        let newSelectedMonth: MonthData | undefined = selectedMonth !== null ? selectedMonth : undefined;
        let newSelectedYear: number | undefined = selectedYear !== null ? selectedYear : undefined;

        if (code === 'ArrowUp' || code === 'ArrowDown' || code === 'ArrowRight' || code === 'ArrowLeft' || code === 'Space' || code === 'Enter') {
            event.preventDefault();
        }

        switch (code) {
            case 'ArrowUp':
                if (selectedDay !== null) {
                    newSelectedDay = selectedDay.getDate() - dayOfWeek.length;
                }
                break;
            case 'ArrowDown':
                if (selectedDay !== null) {
                    newSelectedDay = selectedDay.getDate() + dayOfWeek.length;
                }
                break;
            case 'ArrowRight':
                if (selectedDay !== null) {
                    newSelectedDay = selectedDay.getDate() + 1;
                }
                break;
            case 'ArrowLeft':
                if (selectedDay !== null) {
                    newSelectedDay = selectedDay.getDate() - 1;
                }
                break;
            case 'Space':
            case 'Enter' :
                setIsOpen(!isOpen);
                break;
            case 'Escape' :
                setIsOpen(false);
                break;
        }

        //Меням месяц если выбрали значение из предыдущего или следующего месяца
        if (newSelectedDay !== undefined && newSelectedDay <= 0 && selectedMonth !== null) {
            newSelectedDay = getPrevMonth(selectedMonth.id).days;
            newSelectedMonth = getSelectedMonth('left');
        }

        if (newSelectedMonth !== undefined && newSelectedDay !== undefined && newSelectedDay > newSelectedMonth.days) {
            newSelectedDay = 1;
            newSelectedMonth = getSelectedMonth('right');
        }

        //Меняем год если месяцы меняются с января на декабрь и обратно
        if (newSelectedMonth !== undefined && selectedMonth !== null && selectedYear !== null) {
            newSelectedYear = getYear(newSelectedMonth, selectedMonth, selectedYear);
        }
        //Меняем стейт
        if (newSelectedYear !== undefined && newSelectedMonth !== undefined && newSelectedDay !== undefined) {
            setSelectedDay(getNewSelectedDay(newSelectedYear, newSelectedMonth, newSelectedDay));
            setSelectedMonth(newSelectedMonth);
            //Проверяем дополнительно вернулся новый год или такой же как был выбран до этого,
            //чтоб стейт лишний раз не обновлять
            if (newSelectedYear !== selectedYear) {
                setSelectedYear(newSelectedYear);
            }
        }
    }

    const renderDays = () => {
        let monthData;
        if (selectedYear !== null && selectedMonth !== null) {
            monthData = getVisibleDays(selectedYear, selectedMonth);
        }

        return (
            <div className={styles.daysOfTheWeekContainer}>
                {
                    dayOfWeek.map((day) => <span
                        className={styles.weekDayNames}
                        key={day.id}>{day.shortDayName}
                    </span>)
                }
                {
                    monthData !== undefined && monthData.map((week) => {
                        return week.map(({date, currentMonth}, index) => {
                            return (
                                <div id='day' key={index} className={styles.dayContainer}
                                     onMouseDown={(e) => e.preventDefault()}
                                     onClick={() => changeDay(date)}
                                >
                                    <span id='day' className={cn(styles.day,
                                        {
                                            [styles.nextOrPrevDay]: !currentMonth,
                                            [styles.selectedDay]: selectedDay !== null && areEqual(selectedDay, new Date(date)),
                                            [styles.today]: areEqual(new Date(), new Date(date))
                                        },
                                    )}>
                                        {date.getDate()}
                                    </span>
                                </div>
                            )
                        })
                    })
                }
            </div>
        )
    }

    const renderCalendar = () => {
        return (
            <div className={styles.calendarContainer}
            >
                <div className={styles.calendarHeader}>
                    <div id='left' className={styles.iconLeft}>
                        <IconLeft getId={changeMonth}/>
                    </div>
                    <div>
                        <div className={styles.month}>{selectedMonth?.month}</div>
                        <div className={styles.year}>{`${selectedYear} г.`}</div>
                    </div>
                    <div id='right' className={styles.iconRight}>
                        <IconRight getId={changeMonth}/>
                    </div>
                </div>
                {renderDays()}
            </div>
        )
    }

    return (
        <label className={styles.inputContainer} ref={labelRef}
               onKeyDown={(e) => changeDateWithKeyboard(e)}
        >
            {
                isRequired && <div
                    onMouseDown={(e) => e.preventDefault()}
                    className={styles.iconStarContainer}>
                    <IconStar/>
                </div>
            }
            <input id='input' className={cn(styles.input, {[styles.errorInput]: error?.message})}
                   onClick={() => openAndCloseCalendar()}
                   autoFocus={autoFocus}
                   type={type}
                   placeholder={placeholder}
                   readOnly={true}
                   {...register(name, {
                       validate: {
                           required: (v: string) => isRequired && required(v),
                       }
                   })}
            />
            <div id='iconCalendar' className={styles.iconsContainer}
                onMouseDown={(e) => e.preventDefault()}
            >
                <IconCalendar/>
            </div>
            {
                isOpen && <Popup>
                    {renderCalendar()}
                </Popup>
            }
        </label>
    )
}
