import { getCategoryAggregatedExpenses } from '@/api/category.api';
import { Balance, CategoryWiseExpense, Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import { useGetAllCategories } from '@/hooks/api';
import { useGetUserCurrentBalance } from '@/hooks/api/balance';
import { ExpenseCategoryAggregatedList } from '@/types/expense/expense';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aggregatedExpenses, setAggregatedExpenses] = useState<
    ExpenseCategoryAggregatedList[]
  >([]);
  const { data: categories = [] } = useGetAllCategories();
  const { data: currentBalance = 0 } = useGetUserCurrentBalance();

  useEffect(() => {
    async function fetchData() {
      try {
        const [aggregatedExpenses] = await Promise.all([
          getCategoryAggregatedExpenses()
        ]);
        setAggregatedExpenses(aggregatedExpenses);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
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
