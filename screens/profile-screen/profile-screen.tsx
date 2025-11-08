import { getCurrentUser } from '@/api/user.api';
import { Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import ProfileDetails from '@/components/profile-screen/profile-details';
import { UserProfileData } from '@/types/user/user';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const ProfileScreen = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState<UserProfileData>(
    { email: '', profilePicture: '', userName: '', isProfileCompleted: false }
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <View className="flex gap-6 p-4">
        <ProfileDetails ProfileDetails={currentUserDetails} />
      </View>
    </View>
  );
};

export default ProfileScreen;
