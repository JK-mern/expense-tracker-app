import { ProfileAvatar } from '@/assets/images';
import { getImageUrl } from '@/services/image-service/image-service';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

type ProfileImageProps = {
  imagePath: string | null;
};

const ProfileImage = ({ imagePath }: ProfileImageProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  return (
    <View className="mt-5 items-center">
      <TouchableOpacity>
        <View className="relative h-32 w-32 items-center justify-center rounded-full bg-[#f5e9e4]">
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
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
