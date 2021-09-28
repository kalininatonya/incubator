import * as React from 'react';
import styles from './IconArchive.module.css';

export const IconArchive: React.FC = () => {
    return (
        <svg className={styles.iconArchive} viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M21 8V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8"
                  stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M21 3H3C1.89543 3 1 3.89543 1 5V6C1 7.10457 1.89543 8 3 8H21C22.1046 8 23 7.10457 23 6V5C23 3.89543 22.1046 3 21 3Z"
                stroke="#FA7F08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 12H14" stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}