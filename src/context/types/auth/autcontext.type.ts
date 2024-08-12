import { LoginData, LoginWithProvider, RegisterData, RegisterWithProvider, SaveRole, Usuario } from '../../../auth/interfaces/auth.interfaces';

export type AuthContextProps = {
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
    addError: (error:string) => void;
    removeError: () => void;
    saveRole: (alias: SaveRole) => void;
    finishRegister: () => void;
}
