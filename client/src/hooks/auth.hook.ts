import {useCallback, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {STORAGE_NAME} from '../constants';

export const useAuth = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    const login = useCallback((id: number, name: string, jwtToken: string) => {
        setUserId(id);
        setUserName(name);
        setToken(jwtToken);

        sessionStorage.setItem(
            STORAGE_NAME,
            JSON.stringify({
                userId: id,
                userName: name,
                token: jwtToken,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);

        sessionStorage.removeItem(STORAGE_NAME);
    }, []);

    useEffect(() => {
        const value = sessionStorage.getItem(STORAGE_NAME);
        if (typeof value === 'string') {
            const data = JSON.parse(value);
            if (data && data.token) {
                login(data.userId, data.userName, data.token);
            }
        }
    }, [login, navigate]);

    return {userId, userName, token, login, logout};
};