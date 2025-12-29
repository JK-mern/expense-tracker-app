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
  isProfileCompleted: boolean;
  isProfileLoading: boolean;
};

const initialValue: AuthContextType = {
  user: null,
  isLoading: false,
  userProfileDetails: null,
  isAuthenticated: false,
  isProfileCompleted: false,
  isProfileLoading: false
};

const AuthContext = createContext<AuthContextType>(initialValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: userProfileDetails, isLoading: isProfileLoading } =
    useGetCurrentUser(!!user);
  const isAuthenticated = !!user;
  const isProfileCompleted = userProfileDetails?.isProfileCompleted ?? false;

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoading(true);
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (
        event === 'TOKEN_REFRESHED' ||
        event === 'USER_UPDATED' ||
        event === 'SIGNED_IN' ||
        event === 'INITIAL_SESSION'
      ) {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading,
        userProfileDetails: userProfileDetails ?? null,
        isAuthenticated,
        isProfileCompleted,
        isProfileLoading
      }}
    >
      {isLoading || isProfileLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
