import { ProfileAvatar } from '@/assets/images';
import { useAuth } from '@/providers/auth-provider';
import {
  getImageUrl,
  uploadImage
} from '@/services/image-service/image-service';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

type ProfileImageProps = {
  imagePath: string | null;
};

const ProfileImage = ({ imagePath }: ProfileImageProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);
  const { user } = useAuth();

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
      setNewProfileImage(uri);
    }
  };

  useEffect(() => {
    if (!imagePath) {
      return;
    }

    async function getProfilePicture(imagePath: string) {
      const result = await getImageUrl(imagePath);
      setProfileImage(result);
    }

    getProfilePicture(imagePath);
  }, [imagePath]);

  useEffect(() => {
    async function updateProfilePicture() {
      if (newProfileImage) {
        await uploadImage({ uri: newProfileImage, userId: user?.id! });
      }
    }
    updateProfilePicture();
  }, [newProfileImage]);

  return (
    <View className="mt-5 items-center">
      <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
        <View className="relative h-32 w-32 items-center justify-center rounded-full bg-[#f5e9e4]">
          {profileImage ? (
            <Image
              source={{ uri: newProfileImage ?? profileImage }}
              className="h-32 w-32 rounded-full"
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
    </View>
  );
};

export default ProfileImage;
