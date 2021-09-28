import * as React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import {Incubator} from '../Incubator/Incubator';
import {IconArchive} from '../../../../common/icons/IconArchive/IconArchive';
import {ActualIncubatorsProps} from './models/actualIncubatorsProps';
import styles from './ActualIncubatorsPage.module.css';

export const ActualIncubatorsPage: React.FC<ActualIncubatorsProps> = ({
    incubators,
    openModalDeletion,
    archiveLength
}) => {
        const navigate = useNavigate();

        const moveToArchiveIncubatorPage = () => {
            navigate('/archive');
        }

        const renderArchiveIcon = () => {
            if (archiveLength !== null && archiveLength > 0) {
                return (
                    <div className={styles.archiveContainer} onClick={() => moveToArchiveIncubatorPage()}>
                        <IconArchive/>
                        <div className={styles.countArchiveIncubators}>{`+${archiveLength}`}</div>
                        <span className={styles.archiveText}>Архив</span>
                    </div>

                )
            }
        }

        return (
            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>Актуальные инкубации</h2></div>
                <div className={styles.linkAddBirdContainer}>
                    {renderArchiveIcon()}
                    <NavLink
                        id="addBird"
                        to='/add'
                        className={styles.linkAddBird}>
                        Начать инкубацию
                    </NavLink>
                </div>
                <div className={styles.list}>
                    {
                        incubators.map((incubator) => {
                            return <Incubator
                                key={incubator.id}
                                incubator={incubator}
                                openModalDeletion={openModalDeletion}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
;
