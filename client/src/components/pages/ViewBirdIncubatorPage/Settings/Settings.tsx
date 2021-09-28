import React from 'react';
import cn from 'classnames';
import {formatDate, formatTimeForDateTime} from '../../../../helpers/formatDate';
import {generateSentenceWithRange, generateShortRange} from '../../../../helpers/formationSentence';

import {IconWatch} from '../../../common/icons/IconWatch/IconWatch';
import {IconTemperature} from '../../../common/icons/IconTemperature/IconTemperature';
import {IconHumidity} from '../../../common/icons/IconHumidity/IconHumidity';

import {SettingsProps} from './models/settingsProps';
import styles from './Settings.module.css';

export const Settings: React.FC<SettingsProps> = ({settings}) => {
    const cutDescription = (description: string) => {
        const sentences = description.split('.');
        return (
            <ul className={styles.descriptionContainer}>
                {
                    sentences.length > 1 ? sentences.map((sen, index) => {
                        return sen !== '' ? <li key={index} className={styles.description}>{sen}</li> : null;
                    }) : sentences[0]
                }
            </ul>
        )
    };

    return (
        <>
            {
                settings.map((setting) => {
                    const {
                        day,
                        humidity,
                        temperature,
                        description,
                        startDateTime,
                        endDateTime,
                        isActual,
                    } = setting;
                    return (
                        <div key={day} className={cn(styles.container, {[styles.currentDay]: isActual})}>
                            <div className={styles.dateContainer}>
                                <div className={styles.day}>{`${day}-е сутки`}</div>
                                <div className={styles.date}>{`${formatDate(startDateTime)} - ${formatDate(endDateTime)}`}</div>
                                <div className={styles.timeContainer}>
                                    <div>
                                        <IconWatch/>
                                    </div>
                                    <div className={styles.time}>{formatTimeForDateTime(startDateTime)}</div>
                                </div>
                            </div>
                            <div className={styles.settingsContainer}>
                                <div className={styles.setting}>
                                    <div className={styles.icon}>
                                        <IconTemperature/>
                                    </div>
                                    <span className={styles.textSettingBold}>Температура:</span>
                                    <span className={styles.temperature}>{`${generateSentenceWithRange(temperature, 'C')}`}</span>
                                    <span className={styles.temperatureForSmallScreens}>{`${generateShortRange(temperature, 'C')}`}</span>
                                </div>
                                <div className={styles.setting}>
                                    <div className={styles.icon}>
                                        <IconHumidity/>
                                    </div>
                                    <span className={styles.textSettingBold}>Влажность:</span>
                                    <span className={styles.humidity}>{`${generateSentenceWithRange(humidity, '%')}`}</span>
                                    <span className={styles.humidityForSmallScreens}>{`${generateShortRange(humidity, '%')}`}</span>
                                </div>
                            </div>
                            <div>
                                { description !== '' && cutDescription(description)}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
};
             