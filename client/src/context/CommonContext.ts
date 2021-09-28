import {createContext} from 'react';
import {noop} from '../helpers/noop';
import {Context} from './models/context';

export const CommonContext = createContext<Context>({
    userId: null,
    userName: null,
    token: null,
    isAuthenticated: false,
    login: noop,
    logout: noop,
    changeIsLoading: noop
});