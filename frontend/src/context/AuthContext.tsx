import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

interface IUser {
    id: number;
    email: string;
}

interface IAuthContext {
    user: IUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response= await api.get('/auth/whoami');
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const refreshUser = async () => {
        try {
            const response = await api.get('/auth/whoami');
            setUser(response.data);
        } catch {
            setUser(null);
        }
    }

    const logout = async () => {
        await api.post('/auth/signout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}