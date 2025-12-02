import { getCurrentUser } from '@/api/user.api';
import Loader from '@/components/loader/loader';
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfileDetails(null);
        setIsAuthenticated(false);
      }

      if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          setUser(session.user);
        }
        return;
      }

      const currentUser = session?.user ?? null;
      if (currentUser?.id) {
        try {
          if (!userProfileDetails) {
            const userDetails = await getCurrentUser();
            setUserProfileDetails(userDetails);
          }
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch {
        } finally {
          setLoading(false);
        }
      } else {
        setUser(currentUser);
        setUserProfileDetails(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, userProfileDetails, isAuthenticated }}
    >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
