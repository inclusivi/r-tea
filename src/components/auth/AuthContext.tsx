'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import { firebaseApp } from '@/modules/firebase/config';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

const auth = getAuth(firebaseApp);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    const router = useRouter()

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });


        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Carregando...</div> : children}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

