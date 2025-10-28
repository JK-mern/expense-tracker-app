import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <ActivityIndicator color="#30e86e" size="small" />
    </View>
  );
};

export default Loader;
