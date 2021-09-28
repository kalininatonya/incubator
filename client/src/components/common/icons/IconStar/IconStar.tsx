import * as React from 'react';
import styles from './IconStar.module.css';

export const IconStar: React.FC = () => {
    return (
        <svg className={styles.iconStar} viewBox="0 0 9 8" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.84334 8L1.59791 7.29282L3.43081 4.55249L0 4.66298V3.31492L3.45431 3.44751L1.59791 0.662983L2.84334 0L4.48825 2.96133L6.10966 0L7.37859 0.685083L5.52219 3.44751L9 3.31492V4.66298L5.54569 4.55249L7.37859 7.29282L6.10966 7.9779L4.48825 5.01657L2.84334 8Z"
                fill="#FF4200"/>
        </svg>
    )
}