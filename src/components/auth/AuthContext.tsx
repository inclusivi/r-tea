'use client';

import React from 'react';
import { onAuthStateChanged, getAuth, User as FirebaseUser } from 'firebase/auth';

import { firebaseApp } from '@/modules/firebase/config';
import LoadingPage from '../loading/LoadingPage';
import { User } from '@/modules/user/UserInfo';
import { usePathname, useRouter } from 'next/navigation';
import { IUserContext, NoUserContext, UserContext } from '@/modules/context/UserContext';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

type AuthContextProps = {
    user: User | null;
    userCtx: IUserContext;
    reloadUser: () => Promise<void>;
}

const auth = getAuth(firebaseApp);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const router = useRouter();
    const pathName = usePathname();
    
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [guardLoading, setGuardLoading] = React.useState(true);
    
    async function loadUser(firebaseUser: FirebaseUser | null) {
        if (firebaseUser) {
            const user = new User(firebaseUser);
            await user.loadProfile();
            setUser(user);
        } else {
            setUser(null);
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            await loadUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    React.useEffect(() => {
        if (loading) return;

        function guardRoutes(): string | null {
            if (user == null) {
                // If I'm trying to access a page that requires authentication and I'm not logged in, redirect to login page
                if (pathName.startsWith("/user")) {
                    return "/auth/login";
                }
            } else {
                if (user.profile.userKind) {
                    // If I'm logged in and I have a userKind, redirect to the home page if I'm trying to access the auth pages
                    if (pathName.startsWith("/auth")) {
                        return "/user/home";
                    }
                } else {
                    // If I'm logged in but I don't have a userKind, redirect to welcome page, independent of the current path
                    if (pathName !== '/user/welcome') {
                        return "/user/welcome";
                    }
                }
            }

            return null;
        }

        const redirect = guardRoutes();
        if (redirect) {
            setGuardLoading(true);
            router.replace(redirect);
        } else {
            setGuardLoading(false);
        }

    }, [loading, user, pathName, router]);



    const reloadUser = async () => {
        await loadUser(auth.currentUser!);
    }

    const userCtx = user ? new UserContext(user) : new NoUserContext();

    return (
        <AuthContext.Provider value={{ user, userCtx, reloadUser }}>
            {(loading || guardLoading) ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext<AuthContextProps>({user: null, userCtx: new NoUserContext(), reloadUser: async () => {}});

export const useAuthContext = () => React.useContext(AuthContext);

