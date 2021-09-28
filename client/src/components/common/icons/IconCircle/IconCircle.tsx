import * as React from 'react';
import styles from './IconCircle.module.css';

export const IconCircle: React.FC = () => {
    return (
        <svg className={styles.iconCircle} viewBox="0 0 40 40" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" stroke="#FDE4CC" strokeWidth="2"/>
            <path
                d="M37.0952 20C37.0952 29.4414 29.4414 37.0952 20 37.0952C10.5586 37.0952 2.90479 29.4414 2.90479 20C2.90479 10.5585 10.5586 2.90472 20 2.90472C29.4414 2.90472 37.0952 10.5585 37.0952 20Z"
                stroke="#FA7F08" strokeWidth="2"/>
        </svg>
    )
}