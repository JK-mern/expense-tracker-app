import { verifyOtp } from '@/services/auth-service/auth-service';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // const handleVerify = async () => {
  //   try {
  //     setLoading(true);
  //     const session = await verifyOtp(email!, otp);
  //     Alert.alert('Success', 'Email verified successfully!');
  //     console.log('User session:', session);
  //     router.replace('/(auth)/login');
  //     screen;
  //   } catch (error: any) {
  //     Alert.alert('Invalid OTP', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-between p-6">
        <View className="mt-8">
          <Text className="mb-3 text-center font-inter text-2xl font-bold text-gray-900">
            Enter Your Code
          </Text>
          <Text className="text-center tracking-wide text-text-light">
            We sent a 6-digit code to {email}. The code expires shortly, so
            please enter it soon.
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
          // onPress={handleVerify}
          disabled={loading}
          className="rounded-xl bg-primary py-4"
        >
          <Text className="text-center text-lg font-semibold text-white">
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
