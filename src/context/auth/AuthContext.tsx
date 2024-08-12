import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { REACT_APP_AUTH_SERVICE } from '@env';
import { LoginData, LoginWithProvider, RegisterData, RegisterWithProvider, SaveRole, Usuario } from '../../auth/interfaces/auth.interfaces';
import { AuthState, authReducer } from './AuthReducer';
import createApiInstance from '../../api/apiInstance';
import { AuthContextProps } from '../types/auth/autcontext.type';

export const baseURL = REACT_APP_AUTH_SERVICE;
const api = createApiInstance(baseURL);

const authInitialState: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkToken();// Agregar persistencia a la sesión de usuario
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        if ( !token ) {
            return dispatch({ type: 'notAuthenticated' });
        }

        const resp = await api.get('/auth');// Validar o renovar token

        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.access_token);// Nuevo token con nueva vigencia
        dispatch({
            type: 'signIn',
            payload: {
                user: resp.data,
            },
        });
    };

    const signUpWithProvider = async ({ token, loginprovider, alias_role }: RegisterWithProvider) => {
        setIsLoading(true); // Indicar que se está cargando
        try {
            const { data } = await api.post<Usuario>('/auth/services/register', {token, loginprovider, alias_role});
            console.log(data);
            dispatch({
                type: 'startSignUp',
                payload: {
                    user: data,
                },
            });

            await AsyncStorage.setItem('token', data.access_token);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false); // La petición ha terminado, ya no está cargando
        }
    };

    const signUp = async ({ alias_role, name, lastname, username, password }: RegisterData) => {
        setIsLoading(true);
        try {
            const { data } = await api.post<Usuario>('/auth/credentials/register', {alias_role, name, lastname, username, password});
            console.log('data',data);
            dispatch({
                type: 'startSignUp',
                payload: {
                    user: data,
                },
            });

            await AsyncStorage.setItem('token', data.access_token);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false); // La petición ha terminado, ya no está cargando
        }
    };

    const signInWithProvider = async ({ token, loginprovider }: LoginWithProvider) => {
        setIsLoading(true);
        try {
            const { data } = await api.post<Usuario>('/auth/services/login',{token, loginprovider});
            console.log('data:',data);
            dispatch({
                type: 'signIn',
                payload: {
                    user: data,
                },
            });

            await AsyncStorage.setItem('token', data.access_token);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async ({ username, password }: LoginData) => {
        setIsLoading(true);
        try {
            const { data } = await api.post<Usuario>('/auth/credentials/login', { username, password });

            dispatch({
                type: 'signIn',
                payload: {
                    user: data,
                },
            });

            await AsyncStorage.setItem('token', data.access_token);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const addError = (error: string) => {
        dispatch({ type: 'addError', payload: error });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    const handleApiError = (error:any) => {
        if (error instanceof AxiosError && error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log(`Message: ${error.response.data.message}`);
            dispatch({
                type: 'addError',
                payload: error.response.data.message || 'Revise la información',
            });
        }
    };

    const saveRole = ({alias}: SaveRole) => {
        dispatch({ type: 'saveRole', payload: { role: alias } });
    };

    const finishRegister = () => {
        dispatch({ type: 'signUp'});
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            isLoading,
            signUpWithProvider,
            signUp,
            signInWithProvider,
            signIn,
            logOut,
            addError,
            removeError,
            saveRole,
            finishRegister,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
