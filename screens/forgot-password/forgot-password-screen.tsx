import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-between p-4">
        <View>
          <Text className="pb-2 pt-6 text-left font-inter-bold text-3xl leading-tight tracking-tight">
            Forgot Password ?
          </Text>

          <Text className="pb-8 pt-1 font-inter text-base leading-normal text-gray-400">
            Enter your email address and we will send you a link to get back
            into your account
          </Text>

          <View>
            <Text className="pb-2 font-inter-medium text-base leading-normal">
              Email Address
            </Text>
            <TextInput
              className="rounded-2xl border border-gray-200 p-4 font-inter text-black focus:outline-none focus:ring-0"
              placeholder="example@gmail.com"
            />
          </View>
        </View>

        <View className="pb-6">
          <Pressable className="rounded-xl bg-primary p-4">
            <Text className="text-center font-inter-bold text-white">
              Send Reset Link
            </Text>
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
    </View>
  );
};

export default ForgotPasswordScreen;
