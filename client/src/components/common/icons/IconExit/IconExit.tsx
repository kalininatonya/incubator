import * as React from 'react';
import styles from './IconExit.module.css';

export const IconExit: React.FC = () => {
    return (
        <svg className={styles.iconExit} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="#FDE4CC" strokeWidth="2"/>
            <path
                d="M37.0952 20C37.0952 29.4415 29.4414 37.0953 20 37.0953C10.5586 37.0953 2.90479 29.4415 2.90479 20C2.90479 10.5586 10.5586 2.90479 20 2.90479C29.4414 2.90479 37.0952 10.5586 37.0952 20Z"
                stroke="#FA7F08" strokeWidth="2"/>
            <path
                d="M17.5 27.4648H14.1667C13.7246 27.4648 13.3007 27.2892 12.9882 26.9767C12.6756 26.6641 12.5 26.2402 12.5 25.7982V14.1315C12.5 13.6895 12.6756 13.2656 12.9882 12.953C13.3007 12.6404 13.7246 12.4648 14.1667 12.4648H17.5"
                stroke="#FA7F08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.3333 24.1314L27.5 19.9648L23.3333 15.7981" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.5 19.9648H17.5" stroke="#FA7F08" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}