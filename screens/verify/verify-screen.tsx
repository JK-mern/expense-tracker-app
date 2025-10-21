import { verifyOtp } from '@/services/auth-service/auth-service';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useTransition } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleVerify = () => {
    startTransition(async () => {
      try {
        const session = await verifyOtp(email!, otp);
        startTransition(() => {
          router.replace({
            pathname: '/(auth)/profile',
            params: {
              userId: session.user?.id
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

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
          onPress={handleVerify}
          disabled={isPending}
          className="mt-4 rounded-xl bg-primary px-4 py-3"
        >
          {isPending ? (
            <ActivityIndicator color="#ffff" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Verify
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
