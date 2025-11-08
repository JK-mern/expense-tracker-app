import Loader from '@/components/loader/loader';
import { useAuth } from '@/providers/auth-provider';
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
  const { user, isLoading, userProfileDetails } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (user && userProfileDetails && userProfileDetails?.isProfileCompleted) {
    return <Redirect href={'/(tabs)/home'} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
};

export default AuthLayout;
