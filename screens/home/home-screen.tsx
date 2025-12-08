import { getCurrentBalance } from '@/api/balance.api';
import { getCategoryAggregatedExpenses } from '@/api/category.api';
import { Balance, CategoryWiseExpense, Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import { useGetAllCategories } from '@/hooks/api';
import { ExpenseCategoryAggregatedList } from '@/types/expense/expense';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [aggregatedExpenses, setAggregatedExpenses] = useState<
    ExpenseCategoryAggregatedList[]
  >([]);
  const { data: categories = [] } = useGetAllCategories();

  useEffect(() => {
    async function fetchData() {
      try {
        const [currentBalanceResponse, aggregatedExpenses] = await Promise.all([
          getCurrentBalance(),
          getCategoryAggregatedExpenses()
        ]);
        setCurrentBalance(currentBalanceResponse);
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
