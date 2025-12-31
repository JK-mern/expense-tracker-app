import { useLoading } from '@/providers/loading-provider';
import { resendOtp, verifyOtp } from '@/services/auth-service/auth-service';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Easing, Pressable, Text, View } from 'react-native';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string>('');
  const { isLoading, showLoading, hideLoading } = useLoading();

  const handleVerify = async () => {
    try {
      showLoading();
      await verifyOtp(email!, otp);
    } catch (err) {
      Notifier.showNotification({
        title: 'Failed to verify Otp',
        description: 'Please try again',
        Component: NotifierComponents.Alert,
        showEasing: Easing.ease,
        componentProps: {
          alertType: 'error'
        },
        translucentStatusBar: true
      });
    } finally {
      hideLoading();
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(email);
      Notifier.showNotification({
        title: 'Otp send successfully',
        description: 'Please try another email',
        Component: NotifierComponents.Alert,
        showEasing: Easing.ease,
        componentProps: {
          alertType: 'success'
        },
        translucentStatusBar: true
      });
    } catch (error) {
      console.log(error);
      Notifier.showNotification({
        title: 'Failed to resend Otp',
        description: 'Please try again',
        Component: NotifierComponents.Alert,
        showEasing: Easing.ease,
        componentProps: {
          alertType: 'error'
        },
        translucentStatusBar: true
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-between px-6">
      <View className="">
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
          <Text className="text-text-light">Didnt received the code ?</Text>
          <Pressable onPress={handleResendOtp}>
            <Text className="text-primary">Resend Code </Text>
          </Pressable>
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
