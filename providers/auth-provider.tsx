import { supabase } from '@/lib/supabase/supabase';
import { User } from '@supabase/supabase-js';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';

type AuthContextType = {
  user: User | null;
};

const initalValue: AuthContextType = {
  user: null
};
const AuthContext = createContext<AuthContextType>(initalValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }

    if (!user) {
      getCurrentUser();
    }
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
