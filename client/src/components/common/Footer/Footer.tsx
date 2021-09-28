import * as React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footerContainer}>
           <span className={styles.footerText}>&#169; "Инкубатор" 2022 г.</span>
        </footer>
    )
};
