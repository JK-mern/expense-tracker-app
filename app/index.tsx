import { useAuth } from '@/providers/auth-provider';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href={'/(auth)/login'} />;
}
