import { getCurrentUser } from '@/api/user.api';
import LogoutDialog from '@/components/common/logout-dialog-sheet';
import { Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import ProfileImage from '@/components/profile-screen/profile-image';
import ProfileMenu from '@/components/profile-screen/profile-menu';
import { UpdateBalanceBottomSheet } from '@/components/profile-screen/update-balance-bottom-sheet';
import { useLoading } from '@/providers/loading-provider';
import { signOut } from '@/services/auth-service/auth-service';
import { UserProfileData } from '@/types/user/user';
import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const ProfileScreen = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState<UserProfileData>(
    {
      email: '',
      profilePicture: '',
      userName: '',
      isProfileCompleted: false,
      currentBalance: ''
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const logoutBottomSheetRef = useRef<BottomSheet | null>(null);
  const updateBalanceBottomSheet = useRef<BottomSheet | null>(null);
  const { showLoading, hideLoading } = useLoading();

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

  useEffect(() => {
    async function fetchProfilePageData() {
      try {
        const [currentUser] = await Promise.all([getCurrentUser()]);
        if (currentUser) {
          setCurrentUserDetails(currentUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfilePageData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="flex-1">
      <Header title="Profile" />
      <View className="flex flex-1 flex-col justify-between p-4">
        <View className="flex gap-6">
          <ProfileImage imagePath={currentUserDetails.profilePicture} />
          <ProfileMenu ref={updateBalanceBottomSheet} />
        </View>

        <Pressable
          className="mt-10 items-center rounded-xl bg-primary/30 py-3"
          onPress={() => logoutBottomSheetRef.current?.snapToIndex(1)}
        >
          <Text className="font-inter-bold text-base text-primary">Logout</Text>
        </Pressable>

        <LogoutDialog ref={logoutBottomSheetRef} onLogout={handleLogout} />
        <UpdateBalanceBottomSheet
          ref={updateBalanceBottomSheet}
          currentBalance={currentUserDetails.currentBalance}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
