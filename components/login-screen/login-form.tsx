import { supabase } from '@/lib/supabase/supabase';
import { useLoading } from '@/providers/loading-provider';
import { Login, loginSchema } from '@/schemas/auth';
import { signInWithEmail } from '@/services/auth-service/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Easing,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import GoogleLogo from '../../assets/svgs/google-logo.svg';

export default function LoginForm() {
  const [, setIsErrorToastVisible] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Login>({
    resolver: zodResolver(loginSchema)
  });
  const { isLoading, hideLoading, showLoading } = useLoading();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      showLoading();
      const result = await signInWithEmail(data);
      if (result) {
        setIsErrorToastVisible(false);
      } else {
        Notifier.showNotification({
          title: 'Invalid email or password',
          description: 'Please check your email and password again',
          Component: NotifierComponents.Alert,
          showEasing: Easing.ease,
          componentProps: {
            alertType: 'error'
          },
          translucentStatusBar: true
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response.data?.idToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.data.idToken
        });
        if (error) throw new Error('Failed to signInWithIdToken from supabase');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex justify-center gap-4">
      <View>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={field.value ?? ''}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.email && (
          <Text className="ml-2 mt-2 text-sm text-red-600">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              value={field.value ?? ''}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.password && (
          <Text className="ml-2 mt-2 text-sm text-red-600">
            {errors.password.message}
          </Text>
        )}
      </View>

      <Link
        href={'/(auth)/forgot-password'}
        className="ml-auto font-inter-medium text-primary"
      >
        Forgot password ?
      </Link>

      <Pressable
        className="rounded-xl bg-primary px-4 py-3"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffff" />
        ) : (
          <Text className="text-center font-inter-bold text-base text-white">
            Login
          </Text>
        )}
      </Pressable>
      <View className="my-6 flex flex-row items-center justify-between gap-1">
        <View className="flex-1 border-t border-gray-300"></View>
        <Text className="flex justify-between font-inter text-text-light">
          Or continue with
        </Text>
        <View className="flex-1 border-t border-gray-300"></View>
      </View>
      <View>
        <Pressable
          className="flex flex-row items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3"
          onPress={handleGoogleSignin}
        >
          <GoogleLogo width={20} height={20} className="mr-2" />
          <Text className="ml-2 text-center font-inter-medium text-base">
            Login with Google
          </Text>
        </Pressable>
        <Text className="mt-4 text-center font-inter font-normal text-text-light">
          {"Don't have an account ? "}
          <Link href={'/(auth)/register'} className="font-inter text-primary">
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
}
