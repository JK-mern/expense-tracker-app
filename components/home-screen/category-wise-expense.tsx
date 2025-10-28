import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type CategoryExpenseProps = {
  categoryName: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
};

const categories: CategoryExpenseProps[] = [
  { categoryName: 'Food', iconName: 'restaurant' },
  { categoryName: 'Travel', iconName: 'commute' },
  { categoryName: 'Shopping', iconName: 'shopping-bag' },
  { categoryName: 'Bills', iconName: 'receipt-long' }
];

const CategoryWiseExpense = () => {
  return (
    <View className="">
      <Text className="mb-4 font-inter-bold text-xl">Categories</Text>
      <View className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryExpense
            key={category.categoryName}
            categoryName={category.categoryName}
            iconName={category.iconName}
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryWiseExpense;

const CategoryExpense = ({ categoryName, iconName }: CategoryExpenseProps) => {
  return (
    <View className="flex flex-row items-center gap-3 rounded-2xl bg-white p-4">
      <View className="rounded-full bg-primary/20 p-3">
        <MaterialIcons name={iconName} size={24} color="#30e86e" />
      </View>
      <View className="flex gap-1">
        <Text className="font-inter-medium"> {categoryName}</Text>
        <Text className="font-inter-bold text-lg">$150</Text>
      </View>
    </View>
  );
};
