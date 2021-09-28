import * as React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import {IconArrow} from '../../../../common/icons/IconArrow/IconArrow';
import {Incubator} from '../Incubator/Incubator';

import {ArchiveIncubatorsProps} from './models/archiveIncubatorsProps';
import styles from './ArchiveIncubatorsPage.module.css';

export const ArchiveIncubatorsPage: React.FC<ArchiveIncubatorsProps> = ({
                                                                            incubators,
                                                                            openModalDeletion
                                                                        }) => {
        const navigate = useNavigate();
        const moveToActualIncubatorPage = () => {
            navigate('/');
        }

        return (
            <div className={styles.container}>
                <div onClick={() => moveToActualIncubatorPage()}>
                    <IconArrow/>
                    <span className={styles.actualLink}>Актуальные инкубации</span>
                </div>
                <div className={styles.headingContainer}>
                    <h2 className={styles.heading}>Архив</h2>
                    <NavLink
                        id="addBird"
                        to='/add'
                        className={styles.linkAddBird}>
                        Начать инкубацию
                    </NavLink>
                </div>
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
        )
    }
;
