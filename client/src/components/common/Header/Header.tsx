import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {CommonContext} from '../../../context/CommonContext';
import {IconLogo} from '../icons/IconLogo/IconLogo';
import {IconArchive} from '../icons/IconArchive/IconArchive';
import {IconExit} from '../icons/IconExit/IconExit';
import {HeaderProps} from './models/headerProps';
import styles from './Header.module.css';

export const Header: React.FC<HeaderProps> = ({archiveLength}) => {
    let pathname = useLocation().pathname;
    const [isArchive, setIsArchive] = useState<boolean>(false);
    const {logout, userName, isAuthenticated} = useContext(CommonContext);
    const navigate = useNavigate();

    //Для иконки в шапке
    useEffect(() => {
        if(pathname === '/archive') {
            setIsArchive(true);
        } else {
            setIsArchive(false);
        }
    }, [pathname])

    const goBackToTheMainPage = () => {
      if(isAuthenticated) {
          navigate('/');
      }
    }

    const moveToArchiveIncubatorPage = () => {
        navigate('/archive');
    }

    const renderArchiveIcon = () => {
        if (!isArchive && archiveLength !== null && archiveLength > 0) {
            return (
                <div className={styles.archiveContainer} onClick={() => moveToArchiveIncubatorPage()}>
                    <IconArchive/>
                    <div className={styles.countArchiveIncubators}>{`+${archiveLength}`}</div>
                </div>
            )
        }
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
                <div onClick={goBackToTheMainPage} className={styles.iconLogo}>
                    <IconLogo/>
                </div>
                {
                    isAuthenticated &&
                    <div className={styles.userNameContainer}>
                        {renderArchiveIcon()}
                        <div className={styles.userName}>{userName}</div>
                        <NavLink onClick={() => logout()} to="/login">
                            <div className={styles.iconExit} >
                                <IconExit />
                            </div>
                        </NavLink>
                    </div>
                }
            </div>
            <div className={styles.line}/>
        </header>
    )
};
