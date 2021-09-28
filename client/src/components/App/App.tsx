import * as React from 'react';
import {useCallback, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {CommonContext} from '../../context/CommonContext';
import {authAPI} from '../../api/authAPI';
import {useAuth} from '../../hooks/auth.hook';
import {Loader} from '../common/Loader/Loader';
import {Header} from '../common/Header/Header';
import {Footer} from '../common/Footer/Footer';
import {ErrorPage} from '../pages/ErrorPage/ErrorPage';
import {LoginForm} from '../forms/LoginForm/LoginForm';
import {RegisterForm} from '../forms/RegisterForm/RegisterForm';
import {IncubatorsPage} from '../pages/IncubatorsPage/IncubatorsPage';
import {List} from '../pages/IncubatorsPage/List/List';
import {ViewBirdIncubatorPage} from '../pages/ViewBirdIncubatorPage/ViewBirdIncubatorPage';
import {AddBirdIncubatorPage} from '../pages/AddBirdIncubatorPage/AddBirdIncubatorPage';
import {EditBirdIncubatorPage} from '../pages/EditBirdIncubatorPage/EditBirdIncubatorPage';

import {Sizes} from '../../models/sizes.enum';
import {LoginDataForm} from '../../models/forms/loginDataForm';
import {RegisterDataForm} from '../../models/forms/registerDataForm';
import './styles.css';

export const App: React.FC = () => {
    const {userId, userName, token, login, logout} = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [archiveLength, setArchiveLength] = useState<number | null>(null);
    const isAuthenticated = !!token;

    const changeIsLoading = useCallback((value: boolean) => {
        setIsLoading(value);
    }, []);

    const loginHandler = async (formData: LoginDataForm) => {
        const data = await authAPI.login(formData);
        login(data.userId, data.login, data.token);
        navigate('/');
    };

    const registerHandler = async (formData: RegisterDataForm) => {
        const data = await authAPI.register(formData);
        login(data.userId, data.login, data.token);
        navigate('/');
    };

    //Для небольших дисплеев иконка архивных отображается в шапке системы
    const getArchiveLength = useCallback((archLength: number | null) => {
        setArchiveLength(archLength);
    }, []);

    return (
        <CommonContext.Provider value={{
            userId, userName, token, isAuthenticated, login, logout, changeIsLoading
        }}>
            <div className='main'>
                <Header archiveLength={archiveLength}/>
                <Loader isLoading={isLoading} overlay={true} size={Sizes.Large}>
                    <Routes>
                        <Route path="/" element={<IncubatorsPage/>}>
                            <Route index element={<List isActual={true} getArchiveLength={getArchiveLength}/>}/>
                            <Route path="archive"
                                   element={<List isActual={false} getArchiveLength={getArchiveLength}/>}/>
                            <Route path="/:id" element={<ViewBirdIncubatorPage/>}/>
                            <Route path="add" element={<AddBirdIncubatorPage/>}/>
                            <Route path='/edit/:id' element={<EditBirdIncubatorPage/>}/>
                        </Route>
                        <Route path="/login" element={<LoginForm loginHandler={loginHandler}/>}/>
                        <Route path="/register" element={<RegisterForm registerHandler={registerHandler}/>}/>
                        <Route path="/error" element={<ErrorPage />}/>
                    </Routes>
                </Loader>
                <Footer/>
            </div>
        </CommonContext.Provider>
    )
};
