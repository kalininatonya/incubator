import * as React from 'react';
import styles from './IconArrow.module.css';

export const IconArrow: React.FC = () => {
    return (
        <svg className={styles.iconArrow} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.29289 0.292889C7.68342 -0.0976349 8.31658 -0.0976349 8.70711 0.292889C9.09763 0.683414 9.09763 1.31658 8.70711 1.7071L3.41421 7H15.05C15.5747 7 16 7.44771 16 8C16 8.55228 15.5747 9 15.05 9H3.41421L8.70711 14.2929C9.09763 14.6834 9.09763 15.3166 8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.7071C-0.0976315 8.31658 -0.0976315 7.68341 0.292893 7.29289L7.29289 0.292889Z"
                  fill="#2B69D8"/>
        </svg>
    )
};