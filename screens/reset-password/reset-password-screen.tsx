import { useAuth } from '@/providers/auth-provider';
import { useLoading } from '@/providers/loading-provider';
import { resetPasswordSchema, ResetPasswordType } from '@/schemas/auth';
import {
  setSupabaseSession,
  updateUserPassword
} from '@/services/auth-service/auth-service';
import { parseSupabaseUrl } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Burnt from 'burnt';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

const ResetPasswordScreen = () => {
  const { hideLoading, isLoading, showLoading } = useLoading();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange'
  });
  const { isAuthenticated } = useAuth();
  const url = Linking.getLinkingURL();

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    try {
      showLoading();
      const result = await updateUserPassword(data.password);
      if (result?.isSameAsPrevPassword) {
        Burnt.toast({
          title: 'New password should be different from the old password.',
          preset: 'error',
          message: 'Change your password',
          duration: 3,
          from: 'bottom',
          haptic: 'error'
        });
        return;
      }

      if (result.status) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Burnt.toast({
        title: 'Failed to update Password',
        preset: 'error',
        duration: 3
      });
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (!url) {
      return;
    }

    if (isAuthenticated) {
      return;
    }

    const transformedUrl = parseSupabaseUrl(url);
    const parsedUrl = Linking.parse(transformedUrl);
    const access_token = parsedUrl.queryParams?.access_token;
    const refresh_token = parsedUrl.queryParams?.refresh_token;
    async function setUserSession() {
      if (
        typeof access_token === 'string' &&
        typeof refresh_token === 'string'
      ) {
        try {
          await setSupabaseSession({
            accessToken: access_token,
            refreshToken: refresh_token
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    setUserSession();
  }, [url, isAuthenticated]);

  return (
    <View className="flex-1">
      <View className="mt-10 flex-1 flex-col justify-between p-4">
        <View className="flex-1">
          <View className="flex flex-col gap-3">
            <Text className="font-inter-bold text-3xl text-background-dark">
              Set a New Password
            </Text>
            <Text className="font-inter text-sm text-text-gray-light">
              Your new password must be different from previous passwords.
            </Text>
          </View>

          <View className="mt-10 flex flex-col gap-3">
            <View className="flex gap-2">
              <Text className="font-inter-medium text-lg text-background-dark">
                New Password
              </Text>
              <View>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-primary"
                      placeholder="Enter new password"
                      onChangeText={field.onChange}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.password && (
                  <Text className="ml-2 mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            </View>

            <View className="flex gap-2">
              <Text className="font-inter-medium text-lg text-background-dark">
                Confirm New Password
              </Text>
              <View>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-primary"
                      placeholder="Confirm new password"
                      onChangeText={field.onChange}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="ml-2 mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View className="mb-6">
          <Pressable
            className="rounded-2xl bg-primary p-3"
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffff" />
            ) : (
              <Text className="text-center font-inter-bold text-lg text-white">
                Change Password
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
