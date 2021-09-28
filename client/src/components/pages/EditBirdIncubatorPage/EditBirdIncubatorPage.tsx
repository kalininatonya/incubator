import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {CommonContext} from '../../../context/CommonContext';
import {incubatorAPI} from '../../../api/incubatorAPI';
import {BirdForm} from '../../forms/BirdForm/BirdForm';
import {Incubator} from '../../../models/incubator';
import {BirdDataForm} from '../../../models/forms/birdDataForm';
import styles from './EditBirdIncubatorPage.module.css';

export const EditBirdIncubatorPage: React.FC = () => {
    const {changeIsLoading} = useContext(CommonContext);
    const navigate = useNavigate();
    const [incubator, setIncubator] = useState<Incubator | null>(null);
    const params = useParams();
    const selectedId = Number(params.id);

    //Получаем инкубатор на который кликнули
    useEffect(() => {
        changeIsLoading(true);
        incubatorAPI.getIncubator(selectedId)
            .then(selectedIncubator => {
                setIncubator(selectedIncubator);
            }).finally(() => changeIsLoading(false));
        return () => setIncubator(null);
    }, [changeIsLoading, selectedId]);

    const onSubmit = async (formData: BirdDataForm) => {
        await incubatorAPI.editIncubator(formData, selectedId);
        navigate('/');
    }

    return (
        <div className={styles.editContainer}>
            {
                incubator !== null && <BirdForm isEdit={true} onSubmit={onSubmit} incubator={incubator}/>
            }
        </div>
    )
};
