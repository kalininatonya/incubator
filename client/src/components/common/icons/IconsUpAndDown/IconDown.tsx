import * as React from 'react';
import {IconsUpAndDownProps} from './models/iconsUpAndDownProps';
import styles from './IconsUpAndDown.module.css';

export const IconDown: React.FC<IconsUpAndDownProps> = ({id, getId}) => {
    return (
        <svg id={id} onClick={(e) => getId && getId(e)} className={styles.iconDown} viewBox="0 0 14 8" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path id={id} d="M1 1.5L7 6.5L13 1.5" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}