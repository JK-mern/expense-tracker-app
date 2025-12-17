import Loader from '@/components/loader/loader';
import { useGetCurrentUser } from '@/hooks/api/user';
import { supabase } from '@/lib/supabase/supabase';
import { UserProfileData } from '@/types/user/user';
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
  isLoading: boolean;
  userProfileDetails: UserProfileData | null;
  isAuthenticated: boolean;
};

const initialValue: AuthContextType = {
  user: null,
  isLoading: false,
  userProfileDetails: null,
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextType>(initialValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: userProfileDetails, isLoading: isProfileLoading } =
    useGetCurrentUser(!!user);
  const isAuthenticated = !!user && !!userProfileDetails;

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        return;
      }

      if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          setUser(session.user);
        }
        return;
      }

      const currentUser = session?.user ?? null;
      setUser(currentUser);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isProfileLoading,
        userProfileDetails: userProfileDetails ?? null,
        isAuthenticated
      }}
    >
      {isProfileLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
