import { useLoading } from '@/providers/loading-provider';
import { UserProfileData } from '@/types/user/user';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import LogoutDialog from '../common/logout-dialog-sheet';
import ProfileImage from './profile-image';
import ProfileMenu from './profile-menu';
import { signOut } from '@/services/auth-service/auth-service';

type ProfileDetailsProps = {
  ProfileDetails: UserProfileData;
};

const ProfileDetails = ({ ProfileDetails }: ProfileDetailsProps) => {
  const { showLoading, hideLoading } = useLoading();
  const logoutBottomSheetRef = useRef<BottomSheet | null>(null);

  const handleLogout = async () => {
    try {
      showLoading();
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <View className="flex-1">
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
        onPress={() => logoutBottomSheetRef.current?.snapToIndex(1)}
      >
        <Text className="font-inter-bold text-base text-primary">Logout</Text>
      </Pressable>

      <LogoutDialog ref={logoutBottomSheetRef} onLogout={handleLogout} />
    </View>
  );
};

export default ProfileDetails;
