import { LoginProvider } from '../enums/auth.enums';

// No podemos extender, ni aumentar su capacidad en un type
export interface SaveRole {
    alias: string;
}

export interface RegisterWithProvider {
    token:         string | null;
    loginprovider: LoginProvider;
    alias_role:    string | undefined;
}

export interface LoginWithProvider extends Omit<RegisterWithProvider, 'alias_role'> {}

export interface Usuario {
    id:           number;
    email:        string;
    displayName:  string;
    photoURL:     string;
    role:         Role;
    access_token: string;
}

interface Role {
    id:        number;
    name:      string;
    alias:     string;
    is_active: boolean;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    alias_role: string;
    name?: string;
    lastname?: string;
    username: string;
    password: string;
}

export interface LoginResponse {
    usuario: Usuario;
}
