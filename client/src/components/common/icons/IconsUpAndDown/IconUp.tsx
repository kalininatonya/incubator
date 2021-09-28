import * as React from 'react';
import {IconsUpAndDownProps} from './models/iconsUpAndDownProps';
import styles from './IconsUpAndDown.module.css';

export const IconUp: React.FC<IconsUpAndDownProps> = ({id, getId}) => {
    return (
        <svg id={id} onClick={(e) => getId && getId(e)} className={styles.iconUp} viewBox="0 0 14 8" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path id={id} d="M13 6.5L7 1.5L1 6.5" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
