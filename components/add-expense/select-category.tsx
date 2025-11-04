import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type SelectCategoryProps = {
  onSelect: () => void;
  categoryName: string | null;
};

const SelectCategory = ({ onSelect, categoryName }: SelectCategoryProps) => {
  return (
    <View className="flex flex-row items-center gap-4 rounded-xl bg-primary/10 p-4">
      <View className="flex flex-row items-center gap-4">
        <View className="items-center rounded-full bg-primary/20 p-2">
          <MaterialIcons name="category" size={24} color="#30e86e" />
        </View>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Text className="text-base text-gray-800">
          {categoryName ?? 'Category'}
        </Text>
        <Pressable onPress={onSelect}>
          <Entypo size={15} name="chevron-down" />
        </Pressable>
      </View>
    </View>
  );
};

export default SelectCategory;
