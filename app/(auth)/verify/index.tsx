import VerifyScreen from '@/screens/verify/verify-screen';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Verify() {
  return (
    <SafeAreaView className="flex-1">
      <VerifyScreen />
    </SafeAreaView>
  );
}
