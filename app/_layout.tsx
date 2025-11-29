import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { LoadingProvider } from '@/providers/loading-provider';
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
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

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
    <AuthProvider>
      <LoadingProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <PortalProvider>
              <Toaster position="top-center" />
              <StatusBar style="auto" />

              <NavigationLayout />
            </PortalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

const NavigationLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};
