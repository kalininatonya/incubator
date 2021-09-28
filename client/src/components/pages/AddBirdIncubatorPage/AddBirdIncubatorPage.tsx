import React from 'react';
import {useNavigate} from 'react-router-dom';
import {incubatorAPI} from '../../../api/incubatorAPI';
import {BirdForm} from '../../forms/BirdForm/BirdForm';

import {BirdDataForm} from '../../../models/forms/birdDataForm';
import styles from './AddBirdIncubatorPage.module.css';

export const AddBirdIncubatorPage: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = async (formData: BirdDataForm) => {
        await incubatorAPI.addIncubator(formData);
        navigate('/');
    }

    return (
        <div className={styles.addContainer}>
            <BirdForm isEdit={false} onSubmit={onSubmit}/>
        </div>
    )
};
