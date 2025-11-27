import { useLoading } from '@/providers/loading-provider';
import { requestResetPassword } from '@/services/auth-service/auth-service';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string | null>(null);
  const { hideLoading, showLoading, isLoading } = useLoading();
  const [isResetEmailSend, setIsResetEmailSend] = useState<boolean>(false);

  const handleForgotPassword = async () => {
    try {
      showLoading();
      if (!email) {
        return;
      }
      await requestResetPassword(email);
      setIsResetEmailSend(true);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <View className="flex-1">
      {!isResetEmailSend ? (
        <View className="flex-1 justify-between p-4">
          <View>
            <Text className="pb-2 pt-6 text-left font-inter-bold text-3xl leading-tight tracking-tight">
              Forgot Password ?
            </Text>

            <Text className="pb-8 pt-1 font-inter text-base leading-normal text-gray-400">
              Enter your email address and we will send you a link to get back
              into your account
            </Text>

            <View className="gap-2 p-3">
              <Text className="pb-2 font-inter-medium text-base leading-normal">
                Email Address
              </Text>
              <TextInput
                className="rounded-xl border border-gray-200 bg-white p-4 font-inter text-xl focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="example@gmail.com"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View className="pb-6">
            <Pressable
              className="rounded-xl bg-primary p-4"
              onPress={handleForgotPassword}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffff" size="small" />
              ) : (
                <Text className="text-center font-inter-bold text-white">
                  Send Reset Link
                </Text>
              )}
            </Pressable>

            <Pressable className="pt-4">
              <Link
                href={'/(auth)/login'}
                className="text-center font-inter-medium text-base leading-normal text-primary"
              >
                Back to Login
              </Link>
            </Pressable>
          </View>
        </View>
      ) : (
        <ResetEmailSendNotifier email={email ? email : ''} />
      )}
    </View>
  );
};

const ResetEmailSendNotifier = ({ email }: { email: string }) => {
  return (
    <View className="flex-1 px-6 py-4">
      <View className="flex-1 items-center justify-center">
        <View className="mb-5 items-center rounded-full bg-primary/20 p-6">
          <MaterialCommunityIcons
            name="email-check"
            size={50}
            color="#30e86e"
          />
        </View>

        <Text className="text-center text-3xl font-bold text-black">
          Reset Link Sent
        </Text>

        <Text className="mt-3 text-center text-xl text-text-light">
          {"We've sent an email to  "}
          <Text className="font-semibold">{email}</Text> with a link to reset
          your password. Please check your inbox and spam folder.
        </Text>
      </View>

      <Pressable
        className="mb-6 w-full items-center rounded-xl bg-primary p-4"
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text className="font-inter-bold text-lg text-white">
          Back to Login
        </Text>
      </Pressable>
    </View>
  );
};
