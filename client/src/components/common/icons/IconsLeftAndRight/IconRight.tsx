import * as React from 'react';
import {IconsLeftAndRightProps} from './models/iconsLeftAndRightProps';
import styles from './IconsLeftAndRight.module.css';

export const IconRight: React.FC<IconsLeftAndRightProps> = ({getId}) => {
    return (
        <svg id='right' className={styles.iconRight} onClick={(e) => getId(e)}
             viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path id='right' d="M9 18L15 12L9 6" stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
};
