import ProfileScreen from '@/screens/profile-screen/profile-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default Profile;
