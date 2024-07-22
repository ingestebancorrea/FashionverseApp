import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginWithProvider, RegisterData, RegisterWithProvider, SaveRole, Usuario } from '../../auth/interfaces/authInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import authApi from '../../api/authApi';
import { AxiosError } from 'axios';

type AuthContextProps = {
    role?: string;
    errorMessage: string;
    user: Usuario | null;
    status: 'checking' | 'authenticating' | 'authenticated' | 'not-authenticated';
    isLoading: boolean;
    signUpWithProvider: (registerWithProvider: RegisterWithProvider) => void;
    signUp: (registerData: RegisterData) => void;
    signInWithProvider: (loginWithProvider: LoginWithProvider) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    saveRole: (alias: SaveRole) => void;
    finishRegister: () => void;
}

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

        const resp = await authApi.get('/auth');// Validar o renovar token

        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.access_token);// Nuevo token con nueva vigencia
        dispatch({
            type: 'signIn',
            payload: {
                user: resp.data.usuario,
            },
        });
    };

    const signUpWithProvider = async ({ token, loginprovider, alias_role }: RegisterWithProvider) => {
        setIsLoading(true); // Indicar que se está cargando
        try {
            const { data } = await authApi.post<Usuario>('/auth/services/register', {token, loginprovider, alias_role});
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
            const { data } = await authApi.post<Usuario>('/auth/credentials/register', {alias_role, name, lastname, username, password});
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
            const { data } = await authApi.post<Usuario>('/auth/services/login',{token, loginprovider});
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
            const { data } = await authApi.post<Usuario>('/auth/credentials/login', { username, password });

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
            removeError,
            saveRole,
            finishRegister,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
