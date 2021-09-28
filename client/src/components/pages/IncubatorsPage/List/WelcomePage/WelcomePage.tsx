import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import image from '../../../../../images/img.png';
import {IconArchive} from '../../../../common/icons/IconArchive/IconArchive';

import {WelcomePageProps} from './models/welcomePageProps';
import styles from './WelcomePage.module.css';

export const WelcomePage: React.FC<WelcomePageProps> = ({archiveLength}) => {
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
            <div className={styles.headingContainer}>
                <h2 className={styles.heading}>Добро пожаловать!</h2>
                {renderArchiveIcon()}
            </div>
            <div className={styles.mainContainer}>
                <article className={styles.description}>
                    &laquo;Инкубатор&raquo;&nbsp;&mdash; это онлайн-сервис, который помогает фермерам вести анализ инкубационного
                    периода яиц и&nbsp;отслеживать вылупление птенцов.
                </article>
                <div className={styles.linkAddBirdContainer}>
                    <NavLink
                        id="addBird"
                        to='/add'
                        className={styles.linkAddBird}>
                        Начать инкубацию
                    </NavLink>
                </div>
                <img className={styles.mainImage} src={image} alt='Картинка с фермой'/>
            </div>
        </div>
    )
}