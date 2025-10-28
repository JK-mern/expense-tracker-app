import HomeScreen from '@/screens/home/home-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <HomeScreen />
    </SafeAreaView>
  );
}
