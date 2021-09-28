import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {incubatorAPI} from '../../../../api/incubatorAPI';
import {CommonContext} from '../../../../context/CommonContext';
import {WelcomePage} from './WelcomePage/WelcomePage';
import {ActualIncubatorsPage} from './ActualIncubatorPage/ActualIncubatorsPage';
import {ArchiveIncubatorsPage} from './ArchiveIncubatorPage/ArchiveIncubatorsPage';
import {ModalConfirmation} from '../../../common/modals/ModalConfirmation';

import {Incubator} from '../../../../models/incubator';
import {ListProps} from './models/listProps';

export const List: React.FC<ListProps> = ({isActual, getArchiveLength}) => {
    const navigate = useNavigate();
    const {changeIsLoading} = useContext(CommonContext);
    const [isOpen, setIsOpenModal] = useState<boolean>(false);
    const [incubatorId, setIncubatorId] = useState<number | null>(null);
    const [incubators, setIncubators] = useState<Incubator[] | null>(null);
    const [archiveLength, setArchiveLength] = useState<number | null>(null);

    //Для Header на мелких устройствах
    useEffect(() => {
        getArchiveLength(archiveLength);
    }, [archiveLength, getArchiveLength]);

    const openModalDeletion = (id: number) => {
        setIncubatorId(id);
        setIsOpenModal(true);
    };

    const closeModalDeletion = () => {
        setIsOpenModal(false);
        setIncubatorId(null);
    };

    //Список всех инкубаторов
    const memoizedGetList = useCallback(async () => {
            return (await incubatorAPI.listIncubators());
        },
        [],
    );

    //Отфильтрованный список инкубаторов
    const memoizedFilteredList = useCallback((list: Incubator[]) => {
            return isActual ? list.filter(incubator => incubator.isActual) : list.filter(incubator => !incubator.isActual);
        },
        [isActual],
    );

    //Отображение списка при первичной загрузке
    useEffect(() => {
        changeIsLoading(true);
        memoizedGetList().then(result => {
            const incubators = memoizedFilteredList(result);
            if (isActual) {
                const archiveLength = result.length > 0 ? result.length - incubators.length : null;
                setArchiveLength(archiveLength);
            }
            if (!isActual && incubators !== null && incubators.length === 0) {
                setArchiveLength(null);
                navigate('/');
            }
            setIncubators(incubators);
        }).finally(() => changeIsLoading(false));
        return () => {
            setIncubators(null);
            setArchiveLength(null);
        }
    }, [isActual, navigate, changeIsLoading, memoizedGetList, memoizedFilteredList]);

    //Удаление инкубатора
    const onDeleteIncubator = async () => {
        changeIsLoading(true);
        try {
            if (incubatorId !== null) {
                await incubatorAPI.deleteIncubator(incubatorId);
            }
            const list = await memoizedGetList();
            const incubators = memoizedFilteredList(list);
            //При удалении последнего архивного инкубатора
            if (!isActual && incubators.length === 0) {
                setArchiveLength(null);
                navigate('/');
            } else {
                setIncubators(incubators);
            }
            setIncubatorId(null);
            setIsOpenModal(false);
        } finally {
            changeIsLoading(false);
        }
    }

    const renderIncubators = () => {
        if (incubators !== null) {
            return isActual ? <ActualIncubatorsPage
                    incubators={incubators}
                    archiveLength={archiveLength}
                    openModalDeletion={openModalDeletion}/> :
                <ArchiveIncubatorsPage incubators={incubators} openModalDeletion={openModalDeletion}/>;
        }
    }

    const renderPages = () => {
        return incubators?.length !== 0 ? renderIncubators() :
            <WelcomePage archiveLength={archiveLength}/>;
    }

    return (
        <div>
            {renderPages()}
            {
                isOpen ?
                    <ModalConfirmation
                        closeModalDeletion={closeModalDeletion}
                        onDeleteIncubator={onDeleteIncubator}
                    />
                    : null
            }
        </div>
    )
}