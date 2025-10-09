import LoginForm from '@/components/login-screen/login-form';
import { Text, View } from 'react-native';
import AppLogo from '../../assets/svgs/app-logo.svg';

export default function LoginScreen() {
  return (
    <View className="box-border bg-background-light">
      <View className="flex min-h-screen items-center justify-center p-6">
        <View className="item mx-auto w-full max-w-sm">
          <View className="mb-12 flex flex-col items-center justify-center space-y-3">
            <AppLogo width={80} height={80} />
            <Text className="font-inter-bold text-3xl">Welcome Back</Text>
            <Text className="font-inter text-sm text-text-light">
              Sign in to your account
            </Text>
          </View>
          <LoginForm />
        </View>
      </View>
    </View>
  );
}
