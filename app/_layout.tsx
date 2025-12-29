import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { LoadingProvider } from '@/providers/loading-provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { PortalProvider } from '@gorhom/portal';
import { Toaster } from 'burnt/web';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <LoadingProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <PortalProvider>
                <NotifierWrapper>
                  <Toaster position="top-center" />
                  <StatusBar style="auto" />
                </NotifierWrapper>
                <NavigationLayout />
              </PortalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </LoadingProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

const NavigationLayout = () => {
  const { isAuthenticated, isLoading, isProfileLoading, isProfileCompleted } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || isProfileLoading) return;

    if (isAuthenticated) {
      if (!isProfileCompleted) {
        router.replace('/(auth)/complete-profile');
      } else if (isProfileCompleted) {
        router.replace('/(tabs)/home');
      }
    } else {
      router.replace('/(auth)/login');
    }

    SplashScreen.hide();
  }, [isAuthenticated, isProfileCompleted, isLoading, isProfileLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated && isProfileCompleted}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated || !isProfileCompleted}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
