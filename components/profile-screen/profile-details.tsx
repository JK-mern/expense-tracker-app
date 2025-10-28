import { UserProfileData } from '@/types/user/user';
import { Pressable, Text, View } from 'react-native';
import ProfileImage from './profile-image';
import ProfileMenu from './profile-menu';

type ProfileDetailsProps = {
  ProfileDetails: UserProfileData;
};

const ProfileDetails = ({ ProfileDetails }: ProfileDetailsProps) => {
  const handleLogout = () => {}; //TODO: logout integration

  return (
    <View>
      <ProfileImage imagePath={ProfileDetails.profilePicture} />
      <View className="mt-4 items-center gap-1">
        <Text className="font-inter-bold text-2xl">
          {ProfileDetails.userName}
        </Text>
        <Text className="text-base text-text-light">
          {ProfileDetails.email}
        </Text>
      </View>
      <View className="mt-6 p-2">
        <ProfileMenu />
      </View>

      <Pressable
        className="mt-10 items-center rounded-xl bg-primary/30 py-3"
        onPress={handleLogout}
      >
        <Text className="font-inter-bold text-base text-primary">Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileDetails;
