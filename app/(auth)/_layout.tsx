import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

const AuthLayout = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        process.env.EXPO_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_WEB_CLIENT
    });
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="login/index" />
      <Stack.Screen name="forgot-password/index" />
      <Stack.Screen name="complete-profile/index" />
      <Stack.Screen name="reset-password/index" />
      <Stack.Screen name="verify/index" />
      <Stack.Screen name="register/index" />
    </Stack>
  );
};

export default AuthLayout;
