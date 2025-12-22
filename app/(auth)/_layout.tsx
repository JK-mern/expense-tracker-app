import { Stack } from 'expo-router';

const AuthLayout = () => {
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
