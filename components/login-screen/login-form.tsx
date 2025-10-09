import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import GoogleLogo from '../../assets/svgs/google-logo.svg';

export default function LoginForm() {
  return (
    <View className="justify-center space-y-6">
      <TextInput
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
        placeholder="Password"
        textContentType="password"
        secureTextEntry
      />
      {/* TODO : update with appropriate Link */}
      <Link href={'..'} className="ml-auto font-inter-medium text-primary">
        Forgot password ?
      </Link>

      <Pressable className="rounded-xl bg-primary px-4 py-3">
        <Text className="text-center font-inter-bold text-base text-white">
          Login
        </Text>
      </Pressable>
      <View className="my-6 flex flex-row items-center justify-between gap-1">
        <View className="flex-1 border-t border-gray-300"></View>
        <Text className="flex justify-between font-inter text-text-light">
          Or continue with
        </Text>
        <View className="flex-1 border-t border-gray-300"></View>
      </View>
      <Pressable className="flex flex-row items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3">
        <GoogleLogo width={20} height={20} className="mr-2" />
        <Text className="text-center font-inter-medium text-base">
          Login with Google
        </Text>
      </Pressable>
      <Text className="mt-8 text-center font-inter font-normal text-text-light">
        Don't have an account ?{' '}
        {/* TODO : update with the register page route */}
        <Link href={'..'} className="font-inter text-primary">
          Sign up
        </Link>
      </Text>
    </View>
  );
}
