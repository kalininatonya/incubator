import * as React from 'react';
import styles from './IconEye.module.css';

export const IconEye: React.FC = () => {
  return (
    <svg className={styles.iconEye} viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 9C1 9 5.36364 1 13 1C20.6364 1 25 9 25 9C25 9 20.6364 17 13 17C5.36364 17 1 9 1 9Z"
        stroke="#878787"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 12C14.8075 12 16 10.7086 16 9C16 7.29137 14.8075 6 13 6C11.1925 6 10 7.29137 10 9C10 10.7086 11.1925 12 13 12Z"
        stroke="#878787"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
