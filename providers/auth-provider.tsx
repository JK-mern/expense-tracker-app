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

const initalValue: AuthContextType = {
  user: null,
  isLoading: false,
  userProfileDetails: null,
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextType>(initalValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        setLoading(true);
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        if (currentUser) {
          const userDetails = await getCurrentUser();
          setUserProfileDetails(userDetails);
          setIsAuthenticated(true);
        } else {
          setUserProfileDetails(null);
        }
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndProfile();
  }, []);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfileDetails(null);
        setIsAuthenticated(false);
      }
      const currentUser = session?.user ?? null;
      if (currentUser) {
        setLoading(true);
        try {
          const userDetails = await getCurrentUser();
          setUserProfileDetails(userDetails);
          setIsAuthenticated(true);
        } catch {
        } finally {
          setLoading(false);
        }
      } else {
        setUser(currentUser);
        setUserProfileDetails(null);
        setIsAuthenticated(false);
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
