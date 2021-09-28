import React from 'react';
import styles from './IconDown.module.css';

export const IconDown: React.FC = () => { 
    return (
        <svg id='iconDown' className={styles.iconDown} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.5L12 14.5L18 9.5" stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}