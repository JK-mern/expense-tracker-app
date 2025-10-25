import { checkUserNameExist, createUser } from '@/api/auth.api';
import ProfileImagePicker from '@/components/profile-screen/image-picker';
import { createUserSchema, CreateUserType } from '@/schemas/auth';
import { uploadImage } from '@/services/image-upload/image-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema)
  });

  const handleSelectImgage = (img: string) => {
    setSelectedImage(img);
  };

  const onSubmit: SubmitHandler<CreateUserType> = async (data) => {
    startTransition(async () => {
      try {
        const isUserNameAvailable = await checkUserNameExist(data.userName);
        if (!isUserNameAvailable.data.isUserNameAvailable) {
          //TODO : Show toast when toast component is ready
        }
        if (selectedImage) {
          const uploadedUrlPath = await uploadImage({
            uri: selectedImage,
            userId: userId
          });
          data.profilePicture = uploadedUrlPath;
        }
        const isSignupSuccess = await createUser(data);
        if (isSignupSuccess.success) {
          startTransition(() => {
            router.push('/(auth)/login'); //TODO: Route to homepage when its ready
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-between">
      <View className="gap-6 p-6">
        <ProfileImagePicker
          onSelect={handleSelectImgage}
          selectedImage={selectedImage}
        />
        <View>
          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <TextInput
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Username"
                textContentType="username"
                onChangeText={field.onChange}
                value={field.value ?? ''}
              />
            )}
          />
          {errors.userName && (
            <Text className="ml-2 mt-2 text-sm text-red-500">
              {errors.userName.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            name="currentBalance"
            control={control}
            render={({ field }) => (
              <TextInput
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Current Account Balance"
                onChangeText={field.onChange}
                value={field.value ?? ''}
                inputMode="numeric"
                keyboardType="numeric"
              />
            )}
          />
          {errors.currentBalance && (
            <Text className="ml-2 mt-2 text-sm text-red-500">
              {errors.currentBalance.message}
            </Text>
          )}
        </View>
      </View>

      <View className="mb-8 p-6">
        <Pressable
          className="rounded-xl bg-primary px-4 py-3"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#ffff" />
          ) : (
            <Text className="text-center font-inter-bold text-base text-white">
              Complete Profile Creation
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
