import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

interface AuthProps {
    authState: { token: string | null; authenticated: boolean | false };
    onLogin?: (login: string, password: string) => Promise<any>;
    onRegister?: (email: string, login: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://fox-humble-inherently.ngrok-free.app';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | false;
    }>({
        token: null,
        authenticated: false,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                })
            } else{
                setAuthState({
                    token: null,
                    authenticated: false
                })
            }


        }
        loadToken()
    }, [])

    const register = async (email: string, login: string, password: string) => {
        try{
            return await axios.post(`${API_URL}/users/register`, { email, login, password })
        } catch(error){
            return { error: true, msg: (error as any).response.data.msg};
        }
    }

    const login = async (login: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/users/login`, { login, password });
    
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
    
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
    
            return result;
        } catch (error) {
            console.error('Error during login.', error);
            return { error: true, msg: 'An error occurred during login.' };
        }
    }
    

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)

        axios.defaults.headers.common['Authorization'] = ''

        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onLogin: login,
        onRegister: register,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}