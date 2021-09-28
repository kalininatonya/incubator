import React from 'react';
import {warnings} from '../../../constants';
import {IconClose} from '../icons/IconClose/IconClose';
import {ModalProps} from './models/modalProps';
import styles from './ModalConfirmation.module.css';

export const ModalConfirmation: React.FC<ModalProps> = ({onDeleteIncubator, closeModalDeletion}) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalOverlay}/>
            <div className={styles.modalContent}>
                <div className={styles.modalQuestionContainer}>
                    <div className={styles.modalQuestion}>
                        {warnings.modalConfirmationQuestion}
                    </div>
                    <button className={styles.modalIconClose} type="button" onClick={closeModalDeletion}>
                        <IconClose/>
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={onDeleteIncubator}>
                        Удалить
                    </button>
                    <button
                        type="button"
                        className={styles.returnLink}
                        onClick={closeModalDeletion}>
                        Вернуться назад
                    </button>
                </div>
            </div>
        </div>
    );
};
