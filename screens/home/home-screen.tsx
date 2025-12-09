import { Balance, CategoryWiseExpense, Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import { useGetAllCategories } from '@/hooks/api';
import { useGetUserCurrentBalance } from '@/hooks/api/balance';
import { useGetAggregatedCategorywiseExpenses } from '@/hooks/api/category/useGetAggregatedCategorywiseExpense';
import { View } from 'react-native';

const HomeScreen = () => {
  const { data: categories = [], isLoading: isFetchingAllCategories } =
    useGetAllCategories();
  const { data: currentBalance = 0, isLoading: isFetchingCurrentBalance } =
    useGetUserCurrentBalance();
  const {
    data: aggregatedExpenses = [],
    isLoading: isFetchingAggregatedCategorywiseExpense
  } = useGetAggregatedCategorywiseExpenses();

  if (
    isFetchingAggregatedCategorywiseExpense ||
    isFetchingAllCategories ||
    isFetchingCurrentBalance
  ) {
    return <Loader />;
  }

  return (
    <View>
      <Header title="Overview" />
      <View className="flex gap-8 p-4">
        <Balance currentBalance={currentBalance} />
        <CategoryWiseExpense
          aggregatedList={aggregatedExpenses}
          expenseCategories={categories}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
