import { Usuario } from '../../auth/interfaces/auth.interfaces';

export interface AuthState {
    status: 'checking' | 'authenticating' | 'authenticated' | 'not-authenticated';
    errorMessage: string;
    user: Usuario | null;
    role?: string;
}

type AuthAction =
    | { type: 'startSignUp', payload: { user: Usuario } } // Cuando uno persona crea una cuenta
    | { type: 'signIn', payload: { user: Usuario } } // Cuando una persona se loguea o el token es valido
    | { type: 'signUp' }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' } // Si el token falla se dispara esta opción
    | { type: 'logout' }
    | { type: 'saveRole', payload: { role: string; } }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                errorMessage: action.payload,
            };

        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            };

        case 'startSignUp':
            return {
                ...state,
                status: 'authenticating',
                user: action.payload.user,
            };

        case 'signUp':
            return {
                ...state,
                status: 'authenticated',
            };

        case 'signIn':
            return {
                ...state,
                status: 'authenticated',
                user: action.payload.user,
            };

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                user: null,
            };

        case 'saveRole':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                role: action.payload.role,
            };

        default:
            break;
    }
};
