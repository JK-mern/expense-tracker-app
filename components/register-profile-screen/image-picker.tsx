import { ProfileAvatar } from '@/assets/images';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

type ProfileImagePickerProps = {
  onSelect: (uri: string) => void;
  selectedImage: string | null;
};

export default function ProfileImagePicker({
  onSelect,
  selectedImage
}: ProfileImagePickerProps) {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Please grant access to library');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onSelect(uri);
    }
  };

  return (
    <View className="mt-10 items-center">
      <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
        <View className="relative h-28 w-28 items-center justify-center rounded-full bg-[#f5e9e4]">
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="h-28 w-28 rounded-full"
            />
          ) : (
            <Image
              source={ProfileAvatar}
              className="max-h-28 max-w-28 rounded-full"
            />
          )}
          <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
      <Text className="mt-4 font-medium text-text-light">
        Upload a profile photo
      </Text>
    </View>
  );
}
