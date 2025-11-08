import Loader from '@/components/loader/loader';
import { useAuth } from '@/providers/auth-provider';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';

const TabsRootLayout = () => {
  const { user, userProfileDetails, isLoading } = useAuth();

  if (!user) {
    return <Redirect href={'/(auth)/login'} />;
  }

  if (user && !userProfileDetails) {
    return <Redirect href={'/(auth)/profile'} />;
  }

  if (user && userProfileDetails && !userProfileDetails.isProfileCompleted) {
    return <Redirect href={'/(auth)/profile'} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#30e86e',
        tabBarStyle: {
          borderWidth: 1,
          height: 70,
          justifyContent: 'center',
          padding: 6,
          backgroundColor: '#F7F7F7'
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 5
        }
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="add-expense/index"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="history" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsRootLayout;
