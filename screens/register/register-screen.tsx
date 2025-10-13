import RegisterForm from '@/components/register-screen/register-form';
import { Text, View } from 'react-native';
import AppLogo from '../../assets/svgs/app-logo.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="box-border bg-background-light">
        <View className="flex min-h-screen items-center justify-center p-6">
          <View className="item mx-auto w-full max-w-sm">
            <View className="mb-12 flex flex-col items-center justify-center space-y-3">
              <AppLogo width={80} height={80} fill="#30e86e" />
              <Text className="font-inter-bold text-3xl">Create Account</Text>
              <Text className="font-inter text-sm tracking-wide text-text-light">
                Start your financial journey with us
              </Text>
            </View>
            <RegisterForm />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
