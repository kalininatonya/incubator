import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {warnings} from '../../../../../constants';
import {maxWidthProgress} from './incubatorConstants/incubatorConstants';
import {
    generateSentenceWithRange, generateShortRange,
    makeSentenceWithLeftDays
} from '../../../../../helpers/formationSentence';
import {dateFormatting, formatTimeForDateTime} from '../../../../../helpers/formatDate';

import {IconWatch} from '../../../../common/icons/IconWatch/IconWatch';
import {IconDelete} from '../../../../common/icons/IconDelete/IconDelete';
import {IconEdit} from '../../../../common/icons/IconEdit/IconEdit';
import {IconCircle} from '../../../../common/icons/IconCircle/IconCircle';
import {IconEye} from '../../../../common/icons/IconEye/IconEye';
import {IconTemperature} from '../../../../common/icons/IconTemperature/IconTemperature';
import {IconHumidity} from '../../../../common/icons/IconHumidity/IconHumidity';
import {IconCount} from '../../../../common/icons/IconCount/IconCount';

import {IncubatorProps} from './models/incubatorProps';
import styles from './Incubator.module.css';

export const Incubator: React.FC<IncubatorProps> = ({incubator, openModalDeletion}) => {
    const [widthProgress, setWidthProgress] = useState<string>('');
    const {
        id,
        bird,
        count,
        dateTime,
        daysLeft,
        isActual,
        finishDateTime,
        temperature,
        humidity,
    } = incubator;

    //Линия прогресса-количество дней до конца инкубации
    useEffect(() => {
        if (!isActual) {
            setWidthProgress(`${maxWidthProgress}`);
        } else {
            if(temperature !== null && humidity !== null) {
                const daysProgress = bird.days - daysLeft;
                const width = Math.round(maxWidthProgress * daysProgress / bird.days);
                setWidthProgress(`${width}`);
            }
        }
    }, [isActual, humidity, temperature, daysLeft, bird.days]);

    const renderLineProgress = () => {
        //Для инкубаций которые еще не начались
        if (temperature === null && humidity === null) {
            return <div className={cn(styles.line, styles.lineForFuture)}/>;
        } else {
            return (
                <div className={styles.line}>
                    <div className={cn(styles.lineProgress, {[styles.lineBorder]: widthProgress === '99'})} style={{width: `${widthProgress}%`}}/>
                    <div className={cn(styles.lineRest, {[styles.lineBorder]: widthProgress === '0'})} style={{width: `${maxWidthProgress - Number(widthProgress)}%`}}/>
                </div>
            )
        }
    };

    const renderSentenceWithLeftDays = () => {
        //Пишем сколько дней осталось до конца инкубационного периода, если
        // 1) это не архивный инкубатор
        // 2) если инкубация уже началась
        return isActual && temperature !== null && humidity !== null ? makeSentenceWithLeftDays(daysLeft) : null;
    }

    const renderSettingIcons = () => {
        //Для инкубаций которые еще не начались
        if (temperature === null && humidity === null) {
            return <span className={cn(styles.textBold, styles.warning)}>{warnings.incubationHasNotStarted}</span>
        } else {
            return (
                <div className={styles.settingsContainer}>
                    <div className={styles.settingCount}>
                        <div className={styles.icon}>
                            <IconCount/>
                        </div>
                        <span className={styles.textSettingBold}>Количество яиц:</span>
                        <span className={styles.count}>{`${count || 'не указано'}`}</span>
                    </div>
                    <div className={styles.setting}>
                        <div className={styles.icon}>
                            <IconTemperature/>
                        </div>
                        {
                            temperature !== null && <>
                                <span className={styles.textSettingBold}>Температура:</span>
                                <span className={styles.temperature}>{`${generateSentenceWithRange(temperature, 'C')}`}</span>
                                <span className={styles.temperatureForSmallScreens}>{`${generateShortRange(temperature, 'C')}`}</span>
                            </>
                        }
                    </div>
                    <div className={styles.setting}>
                        <div className={styles.icon}>
                            <IconHumidity/>
                        </div>
                        {
                            humidity !== null && <>
                                <span className={styles.textSettingBold}>Влажность:</span>
                                <span className={styles.humidity}>{`${generateSentenceWithRange(humidity, '%')}`}</span>
                                <span className={styles.humidityForSmallScreens}>{`${generateShortRange(humidity, '%')}`}</span>
                            </>
                        }
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.birdContainer}>
                <div className={styles.bird}>{bird.name}</div>
                <div className={styles.partNumber}>{`Партия ${id}`}</div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.dateTimeContainer}>
                    <div className={styles.date}>{dateFormatting(new Date(dateTime))}</div>
                    <div className={styles.lineContainer}>
                        {
                            isActual ? renderLineProgress() : <div className={cn(styles.line, styles.lineArchive)}/>
                        }
                    </div>
                    <div className={styles.date}>{dateFormatting(new Date(finishDateTime))}</div>
                    <div className={styles.leftTimeContainer}>
                        <IconWatch/>
                        <div className={styles.time}>{formatTimeForDateTime(dateTime)}</div>
                    </div>
                    <div className={styles.restDays}>
                        {renderSentenceWithLeftDays()}
                    </div>
                    <div className={styles.rightTimeContainer}>
                        <IconWatch/>
                        <div className={styles.time}>{formatTimeForDateTime(dateTime)}</div>
                    </div>
                </div>
                {isActual ? renderSettingIcons() : <span className={cn(styles.textBold, styles.warning)}>{warnings.incubationFinished}</span>}
            </div>
            <div className={styles.buttonsContainer}>
                <div>
                    <NavLink
                        id="viewBird"
                        to={`/${id}`}
                        className={styles.linkViewBirdSettings}>
                        Просмотр
                    </NavLink>
                </div>
                <div>
                    <NavLink className={styles.iconViewContainer} to={`/${id}`}>
                        <IconCircle/>
                        <div className={styles.iconEye}>
                            <IconEye/>
                        </div>
                    </NavLink>
                    {
                        isActual &&  <NavLink
                            id="editBird"
                            to={`/edit/${id}`}>
                            <IconEdit/>
                        </NavLink>
                    }
                    <button
                        onClick={() => openModalDeletion(id)}
                        className={styles.buttonDelete}>
                        <IconDelete/>
                    </button>
                </div>
            </div>
        </div>
    )
};