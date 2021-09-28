import * as React from 'react';
import {sizes} from './loaderConstants/loaderConstants';
import loader from '../../../icons/loader.gif';
import {LoaderProps} from './models/loaderProps';
import styles from './Loader.module.css';

export const Loader: React.FC<LoaderProps> = ({isLoading, overlay, size, children}) => {
    return (
        <div>
            {isLoading && overlay ? <div className={styles.loaderOverlay}/> : null}
            {
                isLoading ?
                    <div className={styles.loaderImgContainer}>
                        <img src={loader} alt='loader' style={{width: sizes[size]}}/>
                    </div>
                    : null
            }
            {children}
        </div>
    )
};
