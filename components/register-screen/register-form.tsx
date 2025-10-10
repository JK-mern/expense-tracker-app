import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import GoogleLogo from '../../assets/svgs/google-logo.svg';

export default function RegisterForm() {
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
      <Pressable className="rounded-xl bg-primary px-4 py-3">
        <Text className="text-center font-inter-bold text-base text-white">
          Sign Up
        </Text>
      </Pressable>
      <View className="my-6 flex flex-row items-center justify-between gap-1">
        <View className="flex-1 border-t border-gray-300"></View>
        <Text className="flex justify-between font-inter text-text-light">
          OR
        </Text>
        <View className="flex-1 border-t border-gray-300"></View>
      </View>
      <Pressable className="flex flex-row items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3">
        <GoogleLogo width={20} height={20} className="mr-2" />
        <Text className="text-center font-inter-medium text-base">
          Sign up with Google
        </Text>
      </Pressable>
      <Text className="flex justify-center font-inter font-normal text-text-light">
        Already have an account ?{' '}
        <Link href={'/(auth)/login'} className="font-inter text-primary">
          Sign in
        </Link>
      </Text>
    </View>
  );
}
