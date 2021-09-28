import * as React from 'react';
import {MouseEvent, useEffect, useRef, useState} from 'react';
import cn from 'classnames';

import {useOutsideClick} from '../../../hooks/outsideClick.hook';
import {formatTime} from '../../../helpers/formatDate';
import {required} from '../../../helpers/validators/validators';
import {PART_OF_VISIBLE_TIME} from './timePickerConstants/timePickerConstants';
import {getTime, getVisibleTime} from './timePickerHelpers/timePickerHelpers';

import {IconWatch} from '../icons/IconWatch/IconWatch';
import {IconStar} from '../icons/IconStar/IconStar';
import {IconUp} from '../icons/IconsUpAndDown/IconUp';
import {IconDown} from '../icons/IconsUpAndDown/IconDown';
import {Popup} from '../Popup/Popup';

import {FormFieldsProps} from '../../../models/forms/formFieldsProps';
import {Time} from './models/time';
import styles from './TimePicker.module.css';

export const TimePicker: React.FC<FormFieldsProps> = ({
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
    const [isHour, setIsHour] = useState<boolean>(true); //Фокус на нужной колонке
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
    const [visibleHours, setVisibleHours] = useState<number[] | null>(null);
    const [visibleMinutes, setVisibleMinutes] = useState<number[] | null>(null);

    //Закрыть Popup по клику в молоко
    useOutsideClick(labelRef, () => {
        setIsOpen(false);
    });

    const openAndCloseClock = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        //Время для первичной отрисовки
        const hour = new Date().getHours();
        setSelectedHour(hour);
        const minute = new Date().getMinutes();
        setSelectedMinute(minute);

        //Заполняем видимые часы
        const visibleHours = getVisibleTime(hour, Time.Hours, PART_OF_VISIBLE_TIME);
        setVisibleHours(visibleHours);

        //Заполняем видимые минуты
        const visibleMinutes = getVisibleTime(minute, Time.Minutes, PART_OF_VISIBLE_TIME);
        setVisibleMinutes(visibleMinutes);

    }, []);

    //Устанавливаем выбранное значение в инпут, когда открыли окно
    useEffect(() => {
        if (isOpen && selectedHour !== null && selectedMinute !== null) {
            const time = formatTime(selectedHour, selectedMinute);
            setValue && setValue(name, time, {
                shouldValidate: true
            });
        }
    }, [isOpen, selectedHour, selectedMinute, name, setValue]);

    const setVisibleTime = (time: number | null | undefined, unitsOfTime: Time) => {
        if (time !== null && time !== undefined) {
            if (unitsOfTime === Time.Hours) {
                setSelectedHour(time);
                setVisibleHours(getVisibleTime(time, Time.Hours, PART_OF_VISIBLE_TIME));
            } else {
                setSelectedMinute(time);
                setVisibleMinutes(getVisibleTime(time, Time.Minutes, PART_OF_VISIBLE_TIME));
            }
        }
    }

    //Изменение времени через клаву
    const changeTimeWithKeyboard = (event: React.KeyboardEvent<HTMLLabelElement>) => {
        const {code} = event;

        let newSelectedHour: number | null | undefined;
        let newSelectedMinute: number | null | undefined;

        if (code === 'ArrowUp' || code === 'ArrowDown' || code === 'ArrowRight' || code === 'ArrowLeft' || code === 'Space' || code === 'Enter') {
            event.preventDefault();
        }

        switch (code) {
            case 'ArrowUp':
                if (isHour) {
                    newSelectedHour = selectedHour !== null ? getTime(selectedHour, Time.Hours)?.prev?.value : null;
                } else {
                    newSelectedMinute = selectedMinute !== null ? getTime(selectedMinute, Time.Minutes)?.prev?.value : null;
                }
                break;
            case 'ArrowDown':
                if (isHour) {
                    newSelectedHour = selectedHour !== null ? getTime(selectedHour, Time.Hours)?.next?.value : null;
                } else {
                    newSelectedMinute = selectedMinute !== null ? getTime(selectedMinute, Time.Minutes)?.next?.value : null;
                }
                break;
            case 'ArrowRight':
                setIsHour(false);
                break;
            case 'ArrowLeft':
                setIsHour(true);
                break;
            case 'Space':
            case 'Enter' :
                setIsOpen(!isOpen);
                break;
            case 'Escape' :
                setIsOpen(false);
                break;
        }

        setVisibleTime(newSelectedHour, Time.Hours);
        setVisibleTime(newSelectedMinute, Time.Minutes);

    }

    //Изменение времени по  клику
    const changeTime = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const {id, innerHTML} = (event.target as HTMLDivElement);

        let newSelectedHour: number | null | undefined;
        let newSelectedMinute: number | null | undefined;

        switch (id) {
            case 'hour':
                setIsHour(true);
                newSelectedHour = Number(innerHTML);
                break;
            case 'minute':
                setIsHour(false);
                newSelectedMinute = Number(innerHTML);
                break;
            case 'hoursUp':
                setIsHour(true);
                newSelectedHour = selectedHour !== null ? getTime(selectedHour, Time.Hours)?.prev?.value : null;
                break;
            case 'hoursDown':
                setIsHour(true);
                newSelectedHour = selectedHour !== null ? getTime(selectedHour, Time.Hours)?.next?.value : null;
                break;
            case 'minutesUp':
                setIsHour(false);
                newSelectedMinute = selectedMinute !== null ? getTime(selectedMinute, Time.Minutes)?.prev?.value : null;
                break;
            case 'minutesDown':
                setIsHour(false);
                newSelectedMinute = selectedMinute !== null ? getTime(selectedMinute, Time.Minutes)?.next?.value : null;
                break;
        }

        setVisibleTime(newSelectedHour, Time.Hours);
        setVisibleTime(newSelectedMinute, Time.Minutes);
    }

    const renderWatch = () => {
        return (
            <div className={styles.timeContainer} onMouseDown={(e) => e.preventDefault()}>
                <div className={styles.iconUpContainer}
                     onClick={(e) => changeTime(e)}>
                    <div id='hoursUp' className={cn(styles.iconUp, {
                        [styles.selectedColumn]: isHour,
                        [styles.selectedIconHoursUp]: isHour,
                    })}>
                        <IconUp id={'hoursUp'} getId={changeTime}/>
                    </div>
                    <div id='minutesUp' className={cn(styles.iconUp, {
                        [styles.selectedColumn]: !isHour,
                        [styles.selectedIconMinutesUp]: !isHour,
                    })}>
                        <IconUp id={'minutesUp'} getId={changeTime}/>
                    </div>
                </div>
                <div id='hour' className={styles.hoursContainer}
                     onClick={(e) => changeTime(e)}>
                    {
                        visibleHours && visibleHours.map((hour) => <div id='hour' key={hour}
                                                                        className={cn(styles.hourAndDotsContainer, {[styles.selectedTime]: hour === selectedHour})}>
                            <div id='hour'
                                 className={cn(styles.hour,
                                     {
                                         [styles.selectedHour]: hour === selectedHour,
                                         [styles.selectedColumn]: isHour
                                     })}>{String(hour).padStart(2, '0')}
                            </div>
                            <div className={cn(styles.dots, {[styles.selectedDots]: isHour})}>:</div>
                        </div>)
                    }
                </div>
                <div id='minute' className={styles.minutesContainer}
                     onClick={(e) => changeTime(e)}>
                    {
                        visibleMinutes && visibleMinutes.map((minute) => <div id='minute'
                                                                              key={minute}
                                                                              className={cn(styles.minute,
                                                                                  {
                                                                                      [styles.selectedTime]: minute === selectedMinute,
                                                                                      [styles.selectedColumn]: !isHour
                                                                                  })}
                        >
                            {String(minute).padStart(2, '0')}
                        </div>)
                    }
                </div>
                <div className={styles.iconDownContainer}
                     onClick={(e) => changeTime(e)}>
                    <div id='hoursDown' className={cn(styles.iconUp, {
                        [styles.selectedColumn]: isHour,
                        [styles.selectedIconHoursDown]: isHour,
                    })}>
                        <IconDown id={'hoursDown'} getId={changeTime}/>
                    </div>
                    <div id='minutesDown' className={cn(styles.iconUp, {
                        [styles.selectedColumn]: !isHour,
                        [styles.selectedIconMinutesDown]: !isHour,
                    })}>
                        <IconDown id={'minutesDown'} getId={changeTime}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <label className={styles.inputContainer} ref={labelRef}
               onKeyDown={(e) => changeTimeWithKeyboard(e)}
        >
            {
                isRequired && <div onMouseDown={(e) => e.preventDefault()}
                                   className={styles.iconStarContainer}>
                    <IconStar/>
                </div>
            }
            <input className={cn(styles.input, {[styles.errorInput]: error?.message})}
                   onClick={() => openAndCloseClock()}
                   autoFocus={autoFocus}
                   type={type}
                   placeholder={placeholder}
                   readOnly={true}
                   {...register(name, {
                       validate: {
                           required: (v: string) => isRequired && required(v)
                       }
                   })}
            />
            <div id='iconWatch' className={styles.iconsContainer}
                 onMouseDown={(e) => e.preventDefault()}
            >
                <IconWatch/>
            </div>
            {
                isOpen && <Popup>
                    {renderWatch()}
                </Popup>
            }
        </label>
    )
}
