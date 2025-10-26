import { checkUserExist } from '@/api/auth.api';
import { authSchema, AuthSchemaType } from '@/schemas/auth';
import { regisetUser } from '@/services/auth-service/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import GoogleLogo from '../../assets/svgs/google-logo.svg';
import { useLoading } from '@/providers/loading-provider';

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { isLoading, showLoading, hideLoading } = useLoading();
  console.log(isLoading);
  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    try {
      showLoading();
      const isUserExist = await checkUserExist({ email: data.email });
      if (isUserExist.data.userExist) {
        return;
      }

      const isRegisterSuccessfull = await regisetUser(data);
      if (isRegisterSuccessfull) {
        router.push({
          pathname: '/(auth)/verify',
          params: { email: data.email }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <View className="flex justify-center gap-6">
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              id="email"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.email && (
          <Text className="ml-2 mt-2 text-sm text-red-500">
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
              id="password"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.password && (
          <Text className="ml-2 mt-2 text-sm text-red-500">
            {errors.password.message}
          </Text>
        )}
      </View>

      <Pressable
        className="rounded-xl bg-primary px-4 py-3"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffff" />
        ) : (
          <Text className="text-center font-inter-bold text-base text-white">
            Sign Up
          </Text>
        )}
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
      <Text className="mx-auto flex font-inter font-normal text-text-light">
        Already have an account ?{' '}
        <Link href={'/(auth)/login'} className="font-inter text-primary">
          Sign in
        </Link>
      </Text>
    </View>
  );
}
