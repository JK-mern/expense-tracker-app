import { useAuth } from '@/providers/auth-provider';
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
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
