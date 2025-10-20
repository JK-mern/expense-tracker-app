import ProfileImagePicker from '@/components/profile-screen/image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { email, userId } = useLocalSearchParams<{
    email: string;
    userId: string;
  }>();
  console.log(email, userId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImgage = (img: string) => {
    setSelectedImage(img);
  };

  return (
    <SafeAreaView className="flex-1 justify-between p-6">
      <View className="gap-6 p-6">
        <ProfileImagePicker
          onSelect={handleSelectImgage}
          selectedImage={selectedImage}
        />
        <TextInput
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
          placeholder="Username"
          textContentType="username"
        />
        <TextInput
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter text-lg focus:border-primary focus:outline-none focus:ring-primary"
          placeholder="Current Account Balance"
        />
      </View>

      <View className="p-6">
        <Pressable
          className="rounded-xl bg-primary px-4 py-3"
          onPress={() => {}}
        >
          <Text className="text-center font-inter-bold text-base text-white">
            Complete Profile Creation
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
