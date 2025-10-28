import { getCurrentBalance } from '@/api/balance.api';
import { Balance, CategoryWiseExpense, Header } from '@/components/home-screen';
import Loader from '@/components/loader/loader';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [currentBalanceResponse] = await Promise.all([
          getCurrentBalance()
        ]);
        setCurrentBalance(currentBalanceResponse);
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
        <CategoryWiseExpense />
      </View>
    </View>
  );
};

export default HomeScreen;
