import * as React from 'react';
import styles from './IconDelete.module.css';

export const IconDelete: React.FC = () => {
    return (
        <svg className={styles.iconDelete} viewBox="0 0 40 40" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" stroke="#FDE4CC" strokeWidth="2"/>
            <path
                d="M37.0952 20C37.0952 29.4414 29.4414 37.0952 20 37.0952C10.5586 37.0952 2.90479 29.4414 2.90479 20C2.90479 10.5585 10.5586 2.90472 20 2.90472C29.4414 2.90472 37.0952 10.5585 37.0952 20Z"
                stroke="#FA7F08" strokeWidth="2"/>
            <path d="M12.5 15H14.1667H27.5" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M16.6667 15V13.3333C16.6667 12.8913 16.8423 12.4674 17.1549 12.1548C17.4675 11.8423 17.8914 11.6667 18.3334 11.6667H21.6667C22.1088 11.6667 22.5327 11.8423 22.8453 12.1548C23.1578 12.4674 23.3334 12.8913 23.3334 13.3333V15M25.8334 15V26.6667C25.8334 27.1087 25.6578 27.5326 25.3453 27.8452C25.0327 28.1577 24.6088 28.3333 24.1667 28.3333H15.8334C15.3914 28.3333 14.9675 28.1577 14.6549 27.8452C14.3423 27.5326 14.1667 27.1087 14.1667 26.6667V15H25.8334Z"
                stroke="#FA7F08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.3333 19.1667V24.1667" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M21.6667 19.1667V24.1667" stroke="#FA7F08" strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}