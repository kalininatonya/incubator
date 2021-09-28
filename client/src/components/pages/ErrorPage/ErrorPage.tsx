import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {CommonContext} from '../../../context/CommonContext';
import {incubatorAPI} from '../../../api/incubatorAPI';
import styles from './ErrorPage.module.css';

export const ErrorPage: React.FC = () => {
    const {changeIsLoading} = useContext(CommonContext);
    const navigate = useNavigate();

    const memoizedCheckServer = useCallback(() => {
        changeIsLoading(true);
        incubatorAPI.listIncubators().then(() => {
                navigate('/');
            })
            .finally(() => changeIsLoading(false));
    }, [navigate, changeIsLoading]);

    //Каждые 15мин проверяем работает ли сервер
    useEffect(() => {
        const timer = setTimeout(() => {
            memoizedCheckServer();
        }, 900000);
        return () => clearTimeout(timer);
    }, [memoizedCheckServer]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>ERROR 504</h2>
            <article className={styles.description}>
                Добро пожаловать на&nbsp;наш сайт! К&nbsp;сожалению, сейчас наш сервер отлучился по&nbsp;делам, обычно он&nbsp;надолго не&nbsp;отлучается, поэтому попробуйте
                <button className={styles.update} onClick={memoizedCheckServer}>обновить</button>
                эту страницу чуть позже.
            </article>
        </div>
    )
}