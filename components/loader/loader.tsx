import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
  return (
    <View className="flex w-full items-center justify-center">
      <ActivityIndicator color="#30e86e" size="small" />
    </View>
  );
};

export default Loader;
