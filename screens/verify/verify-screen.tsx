import { useLoading } from '@/providers/loading-provider';
import { verifyOtp } from '@/services/auth-service/auth-service';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useTransition } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string>('');
  const { isLoading, showLoading, hideLoading } = useLoading();

  const handleVerify = async () => {
    try {
      showLoading();
      const session = await verifyOtp(email!, otp);
      router.navigate({
        pathname: '/(auth)/profile',
        params: {
          userId: session.user?.id
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  return (
    <SafeAreaView className="flex min-h-screen justify-between p-6">
      <View className="mt-1">
        <Text className="mb-3 text-center font-inter text-2xl font-bold text-gray-900">
          Enter Your Code
        </Text>
        <Text className="text-center tracking-wide text-text-light">
          We sent a 6-digit code to {email}. The code expires shortly, so please
          enter it soon.
        </Text>
        <View className="mt-8">
          <OtpInput
            numberOfDigits={6}
            onTextChange={setOtp}
            focusColor="green"
            type="numeric"
          />
        </View>
        <View className="mt-5 flex items-center gap-2">
          <Text className="text-text-light">Didnt recieved the code ?</Text>
          <Text className="text-primary">Resend Code </Text>
        </View>
      </View>

      <Pressable
        onPress={handleVerify}
        disabled={isLoading}
        className="mt-4 rounded-xl bg-primary px-4 py-3"
      >
        {isLoading ? (
          <ActivityIndicator color="#ffff" />
        ) : (
          <Text className="text-center text-lg font-semibold text-white">
            Verify
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
