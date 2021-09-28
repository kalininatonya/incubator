import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {CommonContext} from '../../../context/CommonContext';
import {settingsAPI} from '../../../api/settingsAPI';
import {downloadAPI} from '../../../api/downloadAPI';
import {formatDate} from '../../../helpers/formatDate';

import {IconDownload} from '../../common/icons/IconDownload/IconDownload';
import {IconArrow} from '../../common/icons/IconArrow/IconArrow';
import {IconCount} from '../../common/icons/IconCount/IconCount';
import {IconCalendar} from '../../common/icons/IconCalendar/IconCalendar';
import {Settings} from './Settings/Settings';

import {Setting} from '../../../models/settings/setting';
import {Incubator} from '../../../models/settings/incubator';
import styles from './ViewBirdIncubatorPage.module.css';

export const ViewBirdIncubatorPage: React.FC = () => {
    const {changeIsLoading} = useContext(CommonContext);
    const navigate = useNavigate();
    const params = useParams();
    const selectedId = Number(params['id']);
    const [settings, setSettings] = useState<Setting[]>([]);
    const [incubator, setIncubator] = useState<Incubator | null>(null);

    //Получаем настройки для каждого дня инкубации
    useEffect(() => {
        changeIsLoading(true);
        settingsAPI.listSettings(selectedId)
            .then(({incubator, settings}) => {
                setSettings(settings);
                setIncubator(incubator);
            }).finally(() => changeIsLoading(false));
        //Очищаем если компонент размонтировался
        return () => {
            setSettings([]);
            setIncubator(null);
        };
    }, [changeIsLoading, selectedId]);

    //Выгрузка PDF файла с настройками инкубации
    const onCreatePdf = async () => {
        changeIsLoading(true);
        try {
            await downloadAPI.downloadFile(selectedId);
        } finally {
            changeIsLoading(false);
        }
    }

    const moveToActualIncubatorPage = () => {
        navigate('/');
    }

    return (
        <div className={styles.container}>
            <div onClick={() => moveToActualIncubatorPage()}>
                <IconArrow/>
                <span className={styles.actualLink}>Актуальные инкубации</span>
            </div>
            <div className={styles.headContainer}>
                <div className={styles.headingContainer}>
                    <h2 className={styles.heading}>{incubator?.bird.name}</h2>
                    {incubator?.id && <div className={styles.partNumber}>{`Партия ${incubator.id}`}</div>}
                </div>
                <div className={styles.downloadLinkContainer} onClick={onCreatePdf}>
                    <div className={styles.downloadIcon}>
                        <IconDownload/>
                    </div>
                    <span className={styles.downloadLink}>Скачать файл</span>
                </div>
            </div>
            <div className={styles.incubatorContainer}>
                <div>
                    <div className={styles.infoAboutIncubator}>
                        <span className={styles.textBold}>Порода:</span>
                        <span className={styles.text}>{incubator?.breed || 'не указано'}</span>
                    </div>
                    <div className={styles.infoAboutIncubator}>
                        <span className={styles.textBold}>Описание:</span>
                        <span className={styles.text}>{incubator?.description || 'не указано'}</span>
                    </div>
                </div>
                <div>
                    <div className={styles.infoAboutIncubator}>
                        {
                            incubator?.dateTime && <>
                                <div className={styles.icon}>
                                    <IconCalendar/>
                                </div>
                                <span className={styles.textBold}>Дата начала инкубации:</span>
                                <span className={styles.text}>{formatDate(incubator.dateTime)}</span>
                            </>
                        }
                    </div>
                    <div className={styles.infoAboutIncubator}>
                        <div className={styles.icon}>
                            <IconCount/>
                        </div>
                        <span className={styles.textBold}>Количество яиц:</span>
                        <span className={styles.text}>{`${incubator?.count || 'не указано'}`}</span>
                    </div>
                </div>
            </div>
            {settings.length !== 0 && <Settings settings={settings}/>}
        </div>
    )
};
