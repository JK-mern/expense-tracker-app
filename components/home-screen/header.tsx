import { Text, View } from 'react-native';

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <View className="flex items-center justify-center p-5">
      <Text className="font-inter-bold text-lg">{title}</Text>
    </View>
  );
};

export default Header;
