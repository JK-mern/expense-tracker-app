import Loader from '@/components/loader/loader';
import { useAuth } from '@/providers/auth-provider';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated, isLoading, userProfileDetails } = useAuth();

  if (isLoading) {
    <Loader />;
  }

  return (
    <Redirect
      href={
        isAuthenticated && userProfileDetails ? '/(tabs)/home' : '/(auth)/login'
      }
    />
  );
}
