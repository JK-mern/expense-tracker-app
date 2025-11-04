import {
  ExpenseCategories,
  ExprenseCategoryAggregatedList
} from '@/types/expense/expense';
import { getFormattedPrice } from '@/utils';
import { CategoryIcons } from '@/utils/icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type CategoryExpenseProps = {
  expense: ExprenseCategoryAggregatedList | undefined;
  categoryName: string;
};

type CategoryWiseExpenseProps = {
  aggregatedList: ExprenseCategoryAggregatedList[];
  expenseCategories: ExpenseCategories[];
};

export default function CategoryWiseExpense({
  aggregatedList,
  expenseCategories
}: CategoryWiseExpenseProps) {
  return (
    <View>
      <Text className="mb-4 font-inter-bold text-xl">Categories</Text>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        {expenseCategories.map((categories) => (
          <View key={categories.id} className="w-[48%]">
            <CategoryExpense
              expense={aggregatedList.find(
                (list) => list.categoryName === categories.name
              )}
              categoryName={categories.name}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const CategoryExpense = ({ expense, categoryName }: CategoryExpenseProps) => {
  return (
    <View className="shadow-sm flex-row items-center gap-3 rounded-2xl bg-white p-4">
      <View className="rounded-full bg-primary/20 p-3">
        <MaterialIcons
          name={CategoryIcons[categoryName].iconName}
          size={24}
          color="#30e86e"
        />
      </View>
      <View className="flex gap-2">
        <Text className="font-inter-medium">{categoryName}</Text>
        <Text className="font-inter-bold text-base text-text-light">
          {getFormattedPrice(expense ? Number(expense.amount) : 0)}
        </Text>
      </View>
    </View>
  );
};
