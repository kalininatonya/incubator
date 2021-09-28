import * as React from 'react';
import {IconsLeftAndRightProps} from './models/iconsLeftAndRightProps';
import styles from './IconsLeftAndRight.module.css';

export const IconLeft: React.FC<IconsLeftAndRightProps> = ({getId}) => {
    return (
        <svg id='left' className={styles.iconLeft} onClick={(e) => getId(e)}
             viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id='left' d="M15 18L9 12L15 6" stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
};