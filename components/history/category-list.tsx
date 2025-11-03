import { Entypo } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type CategoryListProps = {
  onOpen: () => void;
};

export const CategoryList = ({ onOpen }: CategoryListProps) => {
  return (
    <View className="flex flex-1 flex-row items-center justify-center gap-2 rounded-3xl bg-primary/30 p-3">
      <Text>Category</Text>
      <Pressable onPress={onOpen}>
        <Entypo size={20} name="chevron-down" />
      </Pressable>
    </View>
  );
};
